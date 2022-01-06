/* eslint-disable no-param-reassign */
import { AxiosResponse } from 'axios';

export interface ApiCollectionResponse<T = any> {
  total: number;
  data: T[];
}

export function collectionResponseInterceptor(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
  if (response.headers['x-total-count']) {
    response.data = {
      total: parseInt(response.headers['x-total-count'], 10) || 0,
      data: response.data,
    } as ApiCollectionResponse;
  }

  return response;
}
