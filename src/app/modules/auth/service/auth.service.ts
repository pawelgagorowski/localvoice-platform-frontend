/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { AxiosError, AxiosRequestConfig } from 'axios';
import { InjectKey } from 'vue/types/options';
import { ApiClient } from '~app/core/api';
import { createUrl } from '~app/shared';
import { AuthToken, importAuthToken, TokenStorage } from '../model';

const LOGIN_PATH = '/login.aspx';
const LOGOUT_PATH = '/logout.aspx';

export const AuthInjectKey: InjectKey = 'authService';

export class AuthService {
  private token: Promise<AuthToken | null>;

  private tokenRefreshRequest: Promise<void> | undefined;

  constructor(private storage: TokenStorage, private api: ApiClient) {
    console.log('AuthService fn - constructor');
  }

  get loginUrl(): string {
    return createUrl(window.location.host, LOGIN_PATH);
  }

  initialize(): Promise<AuthToken | null> {
    console.log('AuthService class initialize');
    if (this.token) {
      return this.token;
    }

    this.token = this.storage.load().then((token) => {
      if (token) {
        this.api.interceptors.request.use((request) => this.tokenHeaderInterceptor(request));
        this.api.interceptors.response.use(
          (response) => response,
          (error) => this.refreshTokenInterceptor(error)
        );
      }

      return token;
    });
    return this.token;
  }

  logout(): Promise<void> {
    console.log('logout');
    return this.api
      .post(createUrl(window.location.host, LOGOUT_PATH), null, {
        responseType: 'text',
      })
      .catch(() => undefined)
      .then(() => this.storage.clear())
      .finally(() => this.redirectToLogin());
  }

  redirectToLogin() {
    const returnUrl = `?ReturnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`;
    window.location.href = this.loginUrl + returnUrl;
  }

  private refreshToken(): Promise<void> {
    console.log('refreshtoken!!!!!!!!!!!!!');
    return this.token.then((token) => {
      if (!token) {
        throw Error('No refresh token');
      }

      this.token = this.api
        .post<AuthToken>('/api/authentication/refresh', {
          userId: token.userId,
          refreshToken: token.refresh,
        })
        .then((res) => ({
          ...importAuthToken(JSON.stringify(res.data)),
          rememberMe: token.rememberMe,
        }));

      return this.token.then((authToken) => this.storage.store(authToken)).catch(() => this.logout());
    });
  }

  private tokenHeaderInterceptor(request: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    if (request.url?.includes('authentication')) {
      return Promise.resolve(request);
    }

    return this.token.then((token) => {
      request.headers.Authorization = `Bearer ${token.access}`;
      return request;
    });
  }

  private refreshTokenInterceptor(error: AxiosError): Promise<any> {
    if (error.response?.status === 401 && !error.config.url?.includes('authentication')) {
      if (!this.tokenRefreshRequest) {
        this.tokenRefreshRequest = this.refreshToken();
      }

      return this.tokenRefreshRequest
        .then(() => this.api.request(error.config))
        .finally(() => (this.tokenRefreshRequest = undefined));
    }

    throw error;
  }
}
