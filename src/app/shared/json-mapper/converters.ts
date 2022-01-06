import { v4 as uuidv4 } from 'uuid';
import { Converter } from './json-mapper';
import { hasOwn, isNullOrUndefined, isObjectType } from './utils';

export const dateIsoConverter: Converter = {
  fromJson(isoDate: string): Date {
    return isoDate ? new Date(isoDate) : null;
  },
  toJson(date: Date): string {
    return date ? date.toISOString() : null;
  },
};

export const timestampConverter: Converter = {
  fromJson(data: number): Date {
    return new Date(data);
  },
  toJson(date: Date): number {
    return date && date.getTime ? date.getTime() : null;
  },
};

export const identityConverter = (key = 'id', property?: string): Converter => {
  return {
    /**
     * Converts object to its identity value, eg:
     * - identityConverter('id')({ id: 5, name: 'foo' }) => 5
     * - identityConverter('key')({ id: 5, key: 'foo' }) => foo
     *
     * If `property` is specified converter uses object[property] as `value`, eg:
     * - identityConverter('id', 'other')(ignored, { id: 5, other: { id: 8 } }) => 8
     */
    toJson(value: any, obj: any): any {
      if (property && obj && !hasOwn(obj, property)) {
        throw Error(`Object has no ${property} property`);
      }

      const extractedValue = property ? obj && obj[property] : value;

      if (isNullOrUndefined(extractedValue)) {
        return extractedValue;
      }

      if (!isObjectType(extractedValue)) {
        const msg = property ? `Object[${property}]` : 'Value';
        throw Error(`${msg} is not an object`);
      }

      return extractedValue[key];
    },
  };
};

export const identityMapConverter = (key = 'id', property?: string): Converter => {
  return {
    /**
     * Converts array of objects to array of identity values, eg:
     * - identityConverter('id')([ { id: 5, name: 'foo' }, { id: 8, name: 'bar' } ]) => [5, 8]
     * - identityConverter('key')([ { id: 5, name: 'foo' }, { id: 8, name: 'bar' } ]) => ['foo', 'bar']
     *
     * If `property` is specified converter uses object[property] as `value`, eg:
     * - identityConverter('id', 'other')(ignored, [ { id: 5, other: { id: 8 } }, { id: 20, other: { id: 15 } } ]) => [8, 15]
     */
    toJson(value: any[], obj: any): any[] {
      const array = property ? obj && obj[property] : value;

      if (isNullOrUndefined(array)) {
        return [];
      }

      if (!Array.isArray(array)) {
        const msg = property ? `Object[${property}]` : 'Value';
        throw Error(`${msg} is not an array`);
      }

      return array.map((v) => {
        if (isNullOrUndefined(v)) {
          throw Error(`Array contains null/undefined values`);
        }
        return identityConverter(key).toJson(v);
      });
    },
  };
};

export const uidConverter: Converter = {
  fromJson() {
    return uuidv4();
  },
};

export const negationConverter: Converter<boolean> = {
  fromJson(value: any) {
    return !value;
  },
  toJson(value) {
    return !value;
  },
};
