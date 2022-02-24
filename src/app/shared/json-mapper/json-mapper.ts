import 'reflect-metadata';
import { hasAnyNullOrUndefined, hasOwn, isArrayType, isNullOrUndefined, isObjectType, isPrimitive } from './utils';

/**
 * Automatic JSON mapping using TypeScript decorators.
 *
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html
 * @see http://cloudmark.github.io/Json-Mapping/
 * @see https://github.com/jf3096/json-typescript-mapper
 */

type ReflectDecorator = (target: unknown, targetKey: string | symbol) => void;

/** Decorator metadata key */
const JSON_META_DATA_KEY = 'JsonProperty';

/**
 * Interface for value converter.
 * Use it when custom mapping of a property is required.
 */
export interface Converter<T = any> {
  /**
   * Deserialize raw value.
   */
  fromJson?(value: any, json?: any): T;

  /**
   * Serialize to raw value.
   */
  toJson?(value: T, obj?: any): any;
}

/**
 * Decorator configuration interface.
 */
export interface MapperMetadata<T> {
  name?: keyof T | string;
  type?: new () => T;
  converter?: Converter;
  excludeToJson?: boolean;
}

/**
 * Class property decorator
 */
export function JsonProperty<T>(metadata?: MapperMetadata<T> | string): ReflectDecorator {
  let decoratorMetaData: MapperMetadata<T>;

  if (typeof metadata === 'string') {
    decoratorMetaData = { name: metadata } as MapperMetadata<T>;
  } else if (typeof metadata === 'object') {
    decoratorMetaData = metadata as MapperMetadata<T>;
  } else {
    throw new Error(`index.ts: meta data in Json property is undefined. meta data: ${metadata}`);
  }

  return Reflect.metadata(JSON_META_DATA_KEY, decoratorMetaData) as any;
}

/**
 * Recursively deserialize raw JSON object to model instances
 */
export function deserialize<T>(Type: new () => T, json: any): T | undefined {
  if (hasAnyNullOrUndefined(Type, json) || !isObjectType(json)) {
    return undefined;
  }

  const instance = new Type();

  (Object.keys(instance) as (keyof T)[]).forEach((key) => {
    const metadata = getJsonProperty(instance, key);

    if (!metadata) {
      instance[key] = json[key] !== undefined ? json[key] : instance[key];
      return;
    }

    const property = metadata.name || key;
    const propertyType = getTypeConstructor(instance, key);
    const value: any = json[property] !== undefined ? json[property] : instance[key];

    if (metadata.converter && metadata.converter.fromJson) {
      instance[key] = metadata.converter.fromJson(value, json);
      return;
    }

    if (!metadata.type || isPrimitive(propertyType)) {
      instance[key] = value;
      return;
    }

    if (isArrayType(propertyType) && isArrayType(value) && metadata.type) {
      instance[key] = value.map((item: any) => deserialize(metadata.type!, item));
      return;
    }

    instance[key] = deserialize<any>(propertyType, value);
  });

  return instance;
}

/**
 * Serialize: Creates a ready-for-json-serialization object from the provided model instance.
 *
 * TODO handle T[] serialization
 */
export function serialize<T>(instance: T): any {
  if (!isObjectType(instance) || isArrayType(instance)) {
    return instance;
  }

  const obj: any = {};
  (Object.keys(instance) as (keyof T)[]).forEach((key) => {
    let metadata = getJsonProperty(instance, key);
    if (!metadata) {
      metadata = {};
    }
    if (!metadata.name) {
      metadata.name = key;
    }

    if (!metadata.excludeToJson) {
      obj[metadata.name] = serializeProperty(metadata, instance[key], instance);
    }
  });

  return obj;
}

/**
 * Prepare a single property to be serialized to JSON.
 */
function serializeProperty(metadata: MapperMetadata<any>, value: any, obj: any): any {
  if (metadata.converter && metadata.converter.toJson) {
    return metadata.converter.toJson(value, obj);
  }

  if (!metadata.type || isNullOrUndefined(value)) {
    return value;
  }

  if (isArrayType(value)) {
    return value.map(serialize);
  }

  return serialize(value);
}

/**
 * Converts plain object to model instance.
 * Copies all properties of {object} which are defined in T.
 */
export function toModel<T>(Type: new () => T, object: Partial<T>): T {
  const instance = new Type();

  (Object.keys(instance) as (keyof T)[]).forEach((key) => {
    if (!object || !hasOwn(object, key)) {
      return;
    }

    const value: any = object[key];

    if (isNullOrUndefined(value) || isPrimitive(value)) {
      instance[key] = value;
      return;
    }

    const metadata = getJsonProperty(instance, key);
    if (!metadata || !metadata.type) {
      instance[key] = value;
      return;
    }

    const propertyType = getTypeConstructor(instance, key);
    if (isArrayType(propertyType) && isArrayType(value) && metadata.type) {
      instance[key] = value.map((item: any) => toModel(metadata.type!, item));
      return;
    }

    instance[key] = toModel<any>(metadata.type, value);
  });

  return instance;
}

/** Returns constructor function from property metadata. */
function getTypeConstructor<T>(target: T, propertyKey: keyof T): new () => T {
  return Reflect.getMetadata('design:type', target, propertyKey as string);
}

/** Returns mapping configuration from property metadata. */
function getJsonProperty<T>(target: any, propertyKey: keyof T): MapperMetadata<T> {
  return Reflect.getMetadata(JSON_META_DATA_KEY, target, propertyKey as string);
}
