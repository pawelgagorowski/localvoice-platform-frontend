export function hasOwn<T = any>(object: T | any, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function objectKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export const isNullOrUndefined = (arg: any): boolean => {
  return arg === null || arg === undefined;
};

export const isFunction = (arg: any): boolean => typeof arg === 'function';

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout = 0;

  const debounced = (...args: any[]) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), waitFor);
  };

  return (debounced as unknown) as (...args: Parameters<F>) => ReturnType<F>;
};
