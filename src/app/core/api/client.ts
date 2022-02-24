/* eslint-disable import/no-cycle */
import axios, { AxiosInstance } from 'axios';
import QueryString from 'qs';
import { Sort } from '~app/shared/sort';
import { Config } from '~app/core/config';
import { collectionResponseInterceptor } from './response';

export type ApiClient = AxiosInstance;
export const api: ApiClient = axios.create({
  paramsSerializer(params) {
    console.log('hello mfrom queryString', params);
    // return QueryString.stringify(params, { arrayFormat: 'repeat' });
    let result = '';
    Object.keys(params).forEach((key) => {
      result += `${key}=${encodeURIComponent(params[key])}&`;
    });
    console.log('result.substring(0, result.length - 1);', result.substring(0, result.length - 1));
    return result.substring(0, result.length - 1);
  },
});

export function sortParams(sort?: Sort): { sorting: string } | null {
  return sort && sort.active ? { sorting: `${sort.active},${sort.direction}` } : null;
}

export const apiInitializer: (config: Config) => ApiClient = (config) => {
  api.defaults.baseURL = config.apiUrl;
  api.interceptors.response.use(collectionResponseInterceptor);

  return api;
};
