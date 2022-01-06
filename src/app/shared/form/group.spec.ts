import { FormGroup } from './group';

describe('FormGroup', () => {
  it('setServerErrors should handle array of errors', () => {
    const form = new FormGroup({
      field1: {},
    });

    form.setServerErrors({
      field1: [{ type: 'NOT_UNIQUE' }, { type: 'FORBIDDEN' }],
    });

    expect(form.errors.field1.length).toEqual(2);
    expect(form.errors.field1[0].type).toEqual('NOT_UNIQUE');
    expect(form.errors.field1[1].type).toEqual('FORBIDDEN');
  });

  it('setServerErrors should fill only defined fields', () => {
    const form = new FormGroup({
      field1: {},
    });

    form.setServerErrors({
      field1: [{ type: 'NOT_UNIQUE' }],
      field2: [{ type: 'custom' }],
    } as any);

    expect((form.errors as any)['field2']).toBeUndefined();
  });
});
