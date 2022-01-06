/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */
import { identityConverter, identityMapConverter, timestampConverter } from './converters';
import { JsonProperty, serialize } from './json-mapper';

describe('JSON Mapper - timestampConverter', () => {
  test('toJSON', () => {
    expect(timestampConverter.toJson(new Date('1982-10-02'))).toEqual(402364800000);
    expect(timestampConverter.toJson('not a date')).toEqual(null);
  });

  test('fromJSON', () => {
    expect(timestampConverter.fromJson(402364800000)).toEqual(new Date('1982-10-02'));
  });
});

describe('JSON Mapper - identityConverter', () => {
  test('direct call', () => {
    expect(identityConverter('id', 'prop').toJson({ prop: 8 })).toEqual(undefined);

    const obj = { id: 5, name: 'foo', other: { id: 12, foo: 'bar' }, other2: 'not an object' };
    expect(identityConverter('id').toJson(obj)).toEqual(5);
    expect(identityConverter('name').toJson(obj)).toEqual('foo');
    expect(identityConverter('id', 'other').toJson({}, obj)).toEqual(12);
    expect(identityConverter('foo', 'other').toJson({}, obj)).toEqual('bar');
  });

  test('direct call - null or undefined', () => {
    expect(identityConverter('id').toJson(null)).toEqual(null);
    expect(identityConverter('id').toJson(undefined)).toEqual(undefined);
    expect(identityConverter('id', 'prop').toJson(5, { prop: null })).toEqual(null);
    expect(identityConverter('id', 'prop').toJson(5, { prop: undefined })).toEqual(undefined);
  });

  test('direct call - invalid', () => {
    expect(() => identityConverter('id').toJson(8)).toThrow();
    // prop is not object nor null/undefined
    expect(() => identityConverter('id', 'prop').toJson('ignored', { prop: 8 })).toThrow();
    // missing property in `obj`
    expect(() => identityConverter('id', 'missing').toJson('ignored', { prop: 8 })).toThrow();
  });

  test('with mapper', () => {
    class StubModel {
      constructor(public id: number, public key: string) {}
    }

    class User {
      @JsonProperty({ converter: identityConverter() })
      simpleId: StubModel = undefined;

      @JsonProperty({ converter: identityConverter('key') })
      simpleKey: StubModel = undefined;

      // get identity from `relation.id`
      @JsonProperty({ converter: identityConverter('id', 'relation') })
      relationId: number = undefined;

      @JsonProperty({ excludeToJson: true })
      relation: StubModel = undefined;

      // get identity from `group.key` and assign as `divisionId`
      @JsonProperty({ converter: identityConverter('key', 'group'), name: 'divisionId' })
      groupId: number = undefined;

      @JsonProperty({ excludeToJson: true })
      group: StubModel = undefined;
    }

    const user = new User();
    user.simpleId = new StubModel(5, 'simple1');
    user.simpleKey = new StubModel(8, 'simple2');
    user.relation = new StubModel(25, 'key1');
    user.group = new StubModel(13, 'foo');

    const json = serialize(user);

    expect(json.simpleId).toEqual(5);
    expect(json.simpleKey).toEqual('simple2');

    expect(json).not.toHaveProperty('relation');
    expect(json.relationId).toEqual(25);

    expect(json).not.toHaveProperty('group');
    expect(json.divisionId).toEqual('foo');
  });
});

describe('JSON Mapper - identityMapConverter', () => {
  test('direct call', () => {
    const value = [
      { id: 5, name: 'foo1', obj: { id: 10, foo: 'bar1' } },
      { id: 6, name: 'foo2', obj: { id: 12, foo: 'bar2' } },
    ];
    const obj = {
      other: value,
      other2: 'not an array',
    };
    expect(identityMapConverter('id').toJson(value)).toEqual([5, 6]);
    expect(identityMapConverter('name').toJson(value)).toEqual(['foo1', 'foo2']);
    expect(identityMapConverter('id', 'other').toJson('ignored', obj)).toEqual([5, 6]);
    expect(identityMapConverter('obj', 'other').toJson('ignored', obj)).toEqual([
      { id: 10, foo: 'bar1' },
      { id: 12, foo: 'bar2' },
    ]);
  });

  test('direct call - empty/null/undefined', () => {
    expect(identityMapConverter('id').toJson([])).toEqual([]);
    expect(identityMapConverter('id').toJson(null)).toEqual([]);
    expect(identityMapConverter('id').toJson(undefined)).toEqual([]);
  });

  test('direct call - invalid', () => {
    const val1 = 'not an array nor null/undefined';
    expect(() => identityMapConverter('id').toJson(val1)).toThrow();
    expect(() => identityMapConverter('id', 'prop').toJson('ignored', { prop: val1 })).toThrow();

    const val2: any[] = [null, undefined];
    expect(() => identityMapConverter('id').toJson(val2)).toThrow();
    expect(() => identityMapConverter('id', 'prop').toJson('ignored', { prop: val2 })).toThrow();
  });
});
