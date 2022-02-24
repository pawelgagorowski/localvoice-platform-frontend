/* eslint-disable no-shadow */
import { coerceArray, Converter } from '~app/shared';

export enum AuthPermission {
  VOICEBOT = 1,
  CHATBOT,
}

export const AuthPermissionConverter: Converter = {
  fromJson(value: any[]): AuthPermission[] {
    console.log('value in AuthPermissionConverter', value);
    return coerceArray(value).reduce((acc, it) => {
      if (AuthPermission[it]) {
        acc.push(AuthPermission[it]);
      }
      return acc;
    }, []);
  },
  toJson(value: AuthPermission[]): string[] {
    return coerceArray(value).reduce((acc, it) => {
      if (AuthPermission[it]) {
        acc.push(AuthPermission[it]);
      }
      return acc;
    }, [] as string[]);
  },
};
