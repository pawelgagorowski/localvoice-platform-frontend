/* eslint-disable max-classes-per-file */
import { timestampConverter } from './converters';
import { deserialize, JsonProperty, serialize, toModel } from './json-mapper';
import { hasOwn } from './utils';

class Address {
  @JsonProperty('first-line')
  firstLine: string = undefined;

  @JsonProperty('second-line')
  secondLine: string = undefined;

  city: string = undefined;
}

class Person {
  @JsonProperty('name')
  fullName: string = undefined;

  @JsonProperty({ name: 'dob', converter: timestampConverter })
  dateOfBirth: Date = undefined;

  age: number = undefined;

  @JsonProperty({ type: Address, name: 'Address' })
  address?: Address = undefined;
}

class School {
  id: number = undefined;

  @JsonProperty('Name')
  name: string = undefined;

  @JsonProperty('xing')
  division: string = undefined;

  custom?: string = undefined;

  @JsonProperty({ type: Address, name: 'AddressArr' })
  addressArr: Address[] = [];

  @JsonProperty({ type: Address, name: 'Address' })
  address: Address = undefined;

  @JsonProperty({ type: Person })
  employees: Person[] = undefined;
}

class Student extends Person {
  scores: {
    physics: number[];
    math: number[];
  } = undefined;

  notMappedArray: number[] = undefined;

  @JsonProperty({ type: School, name: 'facility' })
  school: School = undefined;

  @JsonProperty({ excludeToJson: true })
  excluded?: string = undefined;

  custom?: string = undefined;
}

function plainStudent(): Student {
  return {
    scores: {
      math: [3, 5],
      physics: [1, 2],
    },
    fullName: 'full',
    age: 22,
    address: null,
    dateOfBirth: new Date('1984-12-07'),
    notMappedArray: [46, 23, 69],
    excluded: 'foo',
    custom: undefined,
    school: {
      id: 15678,
      name: 'Mark',
      division: undefined,
      employees: [],
      addressArr: [
        {
          firstLine: 'Some where',
          secondLine: 'Over Here',
          city: 'In This City',
        },
        {
          firstLine: 'Some where 2',
          secondLine: 'Over Here 2',
          city: 'In This City 2',
        },
      ],
      address: {
        firstLine: 'Some where',
        secondLine: 'Over Here',
        city: 'In This City',
      },
    },
  };
}

describe('JSON Mapper - deserialize', () => {
  it('simple json object #1', () => {
    const school = deserialize(School, {
      id: 2583,
      Name: 'Mark',
      xing: 'Galea',
      Address: null,
    });
    expect(school.id).toEqual(2583);
    expect(school.address).toEqual(undefined);
    expect(school.name).toEqual('Mark');
    expect(school.division).toEqual('Galea');
    expect(school.addressArr).toEqual([]);
  });

  it('simple json object #2', () => {
    const addressJson = {
      'first-line': 'Some where',
      'second-line': 'Over Here',
      city: 'In This City',
    };
    const address = deserialize(Address, addressJson);
    expect(address.firstLine).toEqual('Some where');
    expect(address.secondLine).toEqual('Over Here');
    expect(address.city).toEqual('In This City');
  });

  it('complex json object #1', () => {
    const json = {
      // student
      name: 'John',
      dob: '1986-06-14',
      age: 30,
      Address: {
        'first-line': 'Some where',
        'second-line': 'Over Here',
        city: 'In This City',
      },
      scores: {
        physics: [4, 8],
        math: [73],
      },
      facility: {
        // school
        xing: 'MIT',
        AddressArr: [
          {
            'first-line': 'Some where',
            'second-line': 'Over Here',
            city: 'In This City',
          },
          {
            'first-line': 'Some where',
            'second-line': 'Over Here',
            city: 'In This City',
          },
        ],
        employees: [
          {
            name: 'Mike',
            dob: '1964-09-02',
            age: 68,
            Address: {
              'first-line': 'Charming St',
              'second-line': 'US',
              city: 'New York',
            },
          },
        ],
      },
    };
    const student = deserialize(Student, json);
    expect(student.address instanceof Address).toEqual(true);
    expect(typeof student.fullName).toEqual('string');
    expect(typeof student.address).toEqual('object');
    expect(student.address.city).toEqual('In This City');
    expect(student.scores).toEqual(json.scores);
    expect(student.school instanceof School).toBe(true);
    expect(student.school.employees[0] instanceof Person).toBe(true);
    expect(student.school.addressArr[0] instanceof Address).toBe(true);
  });

  it('empty json object #1', () => {
    const json = {};
    const person = deserialize(School, json);
    expect(person.address).toEqual(undefined);
    expect(person.name).toEqual(undefined);
    expect(person.division).toEqual(undefined);
    expect(person.addressArr).toEqual([]);
  });

  it('empty json object #2', () => {
    const json: any = null;
    const person = deserialize(School, json);
    expect(person).toEqual(undefined);
  });

  it('empty json object #3', () => {
    const json: any = undefined;
    const person = deserialize(School, json);
    expect(person).toEqual(undefined);
  });

  it('invalid primitive value #1', () => {
    const json = 123;
    const person = deserialize(School, json as any);
    expect(person).toEqual(undefined);
  });

  it('invalid primitive value #2', () => {
    const json = '';
    const person = deserialize(School, json as any);
    expect(person).toEqual(undefined);
  });

  it('invalid primitive value #3', () => {
    const person = deserialize(School, NaN);
    expect(person).toEqual(undefined);
  });

  it('invalid json object #1', () => {
    const json = {
      NameTest: 'Mark',
    };
    const person = deserialize(School, json);
    expect(person.name).toEqual(undefined);
  });

  test('custom converter', () => {
    const student = deserialize(Person, {
      name: 'John Doe',
      dob: 815961600000,
    });
    expect(student.dateOfBirth instanceof Date).toEqual(true);
    expect(student.dateOfBirth.toString()).toEqual(new Date('1995-11-10').toString());
  });

  test('non primitives without type should be returned as is', () => {
    class Foo {
      @JsonProperty({ name: 'roleIds2' })
      roleIds: number[] = undefined;

      @JsonProperty({ name: 'employee2' })
      employee: { name: string } = undefined;
    }

    const model = deserialize(Foo, { roleIds2: [5], employee2: { name: 'foo' } });
    expect(model.roleIds).toEqual([5]);
    expect(model.employee).toEqual({ name: 'foo' });
  });
});

describe('JSON Mapper - toModel', () => {
  test('simple object - Address', () => {
    const plain: Address = {
      firstLine: 'first',
      secondLine: null,
      city: undefined,
    };
    const model = toModel(Address, plain);
    expect(model instanceof Address).toEqual(true);
    expect(model.firstLine).toBe('first');
    expect(model.secondLine).toBe(null);
    expect(model.city).toBe(undefined);
  });

  test('simple object - Person', () => {
    const plain: Person = {
      fullName: 'full',
      dateOfBirth: new Date('1982-10-02'),
      age: 37,
    };
    const model = toModel(Person, plain);
    expect(model instanceof Person).toEqual(true);
    expect(model.fullName).toEqual('full');
    expect(model.dateOfBirth).toBe(plain.dateOfBirth);
    expect(model.age).toEqual(37);
    expect(hasOwn(model, 'address')).toBe(true);
  });

  test('complex object - School', () => {
    const plain: School = {
      id: 15678,
      name: 'Mark',
      division: null,
      custom: 'custom value',
      employees: [],
      addressArr: [
        {
          firstLine: 'Some where',
          secondLine: 'Over Here',
          city: 'In This City',
        },
        {
          firstLine: 'Some where 2',
          secondLine: 'Over Here 2',
          city: 'In This City 2',
        },
      ],
      address: {
        firstLine: 'Some where',
        secondLine: 'Over Here',
        city: 'In This City',
      },
    };

    const model = toModel(School, plain);
    expect(model instanceof School).toBe(true);
    expect(model.id).toBe(plain.id);
    expect(model.name).toBe(plain.name);
    expect(model.division).toBe(null);
    expect(model.custom).toBe('custom value');
    expect(model.employees).toEqual([]);
    expect(Array.isArray(model.addressArr)).toBe(true);
    expect(model.addressArr).not.toBe(plain.addressArr); // is copy
    expect(model.addressArr[0]).not.toBe(plain.addressArr[0]); // is copy
    expect(model.addressArr[0]).toBeInstanceOf(Address);
    expect(model.addressArr).toEqual(plain.addressArr); // but equal
    expect(model.address).not.toBe(plain.address); // copy
    expect(model.address).toEqual(plain.address); // but equal
    expect(model.address).toBeInstanceOf(Address);
  });

  test('complex object - Student', () => {
    const plain: Student = plainStudent();
    const model = toModel(Student, plain);

    expect(model instanceof Student).toBe(true);
    // excluded should be assigned too
    expect(model.excluded).toEqual('foo');
    // not mapped values should be assigned "as is"
    expect(model.scores).toBe(plain.scores);
    expect(model.notMappedArray).toBe(plain.notMappedArray);
  });

  test('explicit null value should be preserved', () => {
    class Foo {
      @JsonProperty('name')
      fullName: string = null;
    }

    const model = toModel(Foo, { fullName: null });
    expect(model.fullName).toBe(null);
  });
});

describe('JSON Mapper - serialize', () => {
  test('complex model', () => {
    const model = toModel(Student, plainStudent());
    const json = serialize(model);

    expect(json.scores).toBe(model.scores); //
    expect(json.scores).toEqual(model.scores);
    expect(json.name).toEqual('full');
    expect(json.age).toEqual(22);
    expect(json).toHaveProperty('Address');
    expect(json.Address).toBe(null);
    expect(json.dob).toEqual(471225600000);
    expect(json.notMappedArray).toBe(model.notMappedArray);
    expect(json.notMappedArray).toEqual(model.notMappedArray);
    expect(json).not.toHaveProperty('excluded');
    expect(json.custom).toEqual(undefined);
    expect(json.facility).toBeInstanceOf(Object);
    expect(json.facility.xing).toEqual(undefined);
  });

  test('excludeToJson', () => {
    const model = toModel(Student, plainStudent());
    const json = serialize(model);

    expect(json).not.toHaveProperty('excluded');
  });

  test('custom converter', () => {
    const student = new Person();
    student.fullName = 'John Doe';
    student.dateOfBirth = new Date('1995-11-10');

    const json = serialize(student);
    expect(json.name).toEqual('John Doe');
    expect(json.dob).toEqual(815961600000);
  });

  test('explicit null value should be preserved', () => {
    class Foo {
      @JsonProperty('name')
      fullName: string = null;
    }

    const json = serialize(new Foo());
    expect(json.name).toBe(null);
  });
});
