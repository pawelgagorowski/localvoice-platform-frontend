import { AxiosResponse } from 'axios';
import { api, ApiClient } from '~app/core/api';

export class PasswordService {
  constructor(private api: ApiClient) {}

  change(current: string, password: string): Promise<AxiosResponse> {
    return this.api.put<void>('/api/account/me/password', {
      oldPassword: current,
      newPassword: password,
    });
  }
}

export const passwordService = new PasswordService(api);
