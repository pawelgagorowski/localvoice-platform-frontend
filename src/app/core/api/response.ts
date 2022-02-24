/* eslint-disable no-param-reassign */
import { AxiosResponse } from 'axios';

export interface ApiCollectionResponse<T = any> {
  total: number;
  data: T[];
}

export interface ResponseMessage<T = any> {
  message: T;
}

export function collectionResponseInterceptor(responseMessage: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
  let response;
  console.log('responseMessage', responseMessage);
  if (responseMessage.status < 400) {
    response = {
      data: responseMessage.data.message,
    };
  } else {
    response = {
      data: responseMessage.data.errorMessage,
    };
  }
  return response as AxiosResponse | Promise<AxiosResponse>;
}
