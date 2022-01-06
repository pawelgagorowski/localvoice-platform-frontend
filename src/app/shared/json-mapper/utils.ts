/**
 * Returns true if value has primitive type (string, number, boolean)
 */
export function isPrimitive(value: any): boolean {
  return [isStringType, isNumberType, isBooleanType].some((fn) => fn(value));
}

export function isStringType(value: any) {
  return typeof value === 'string' || value instanceof String || value === String;
}

export function isNumberType(value: any) {
  return typeof value === 'number' || value instanceof Number || value === Number;
}

export function isBooleanType(value: any) {
  return typeof value === 'boolean' || value instanceof Boolean || value === Boolean;
}

export function isArrayType(type: any): boolean {
  return type === Array || Object.prototype.toString.call(type) === '[object Array]';
}

export function isObjectType(val: any): boolean {
  return typeof val === 'object';
}

export function hasOwn<T = any>(object: T | any, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function isNullOrUndefined(arg: any): boolean {
  return arg === null || arg === undefined;
}

/** Check if any argument is null or undefined */
export function hasAnyNullOrUndefined(...args: any[]): boolean {
  return args.some(isNullOrUndefined);
}
