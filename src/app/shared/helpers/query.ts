import { QueryParams } from '../types';

export const getQueryParameters = <T>(paramsFromRequest: QueryParams, ...queryParams: string[]): T | null => {
  const result = {} as T;
  let isNotAvailable = false;
  queryParams.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(paramsFromRequest, key)) {
      result![key as keyof T] = paramsFromRequest[key] as any;
    } else isNotAvailable = true;
  });

  return !isNotAvailable ? result : null;
};
