import { ObjectAttribute } from '../types';

export function getAttributesToUpdate<T, K>(value: Partial<T>, poosibleAttributesToUpdate: K[]): Partial<T> {
  return Object.keys(value).reduce((acc, it) => {
    if (poosibleAttributesToUpdate.indexOf(it as any) >= 0) {
      acc[it as keyof T] = value[it as keyof T];
    }
    return acc;
  }, {} as Partial<T>);
}

export function getAttributeToUpdate<T, K = any>(value: Partial<T>, poosibleAttributesToUpdate: K[]): ObjectAttribute {
  return Object.keys(value).reduce((acc, it) => {
    if (poosibleAttributesToUpdate.indexOf(it as any) >= 0) {
      acc.key = it;
      // @ts-expect-error rework it
      acc.value = value[it];
    }
    return acc;
  }, {} as ObjectAttribute);
}
