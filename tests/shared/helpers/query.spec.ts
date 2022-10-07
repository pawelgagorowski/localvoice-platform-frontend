import { getQueryParameters } from '~app/shared/helpers/query';

describe('getQueryParameters fn', () => {
  it('should return object', () => {
    const input = {
      name: 'Paweł',
      surname: 'Gagor',
    };

    const expected = {
      name: 'Paweł',
      surname: 'Gagor',
    };
    expect(getQueryParameters(input, 'name', 'surname')).toEqual(expected);
    expect(getQueryParameters(input, 'name')).toEqual({ name: 'Paweł' });
  });
  it('should return null', () => {
    const input = {
      name: 'Paweł',
      surname: 'Gagor',
    };
    expect(getQueryParameters(input, 'name', 'surname', 'address')).toEqual(null);
    expect(getQueryParameters({}, 'name', 'surname', 'address')).toEqual(null);
    expect(getQueryParameters(input, 'phone')).toEqual(null);
  });
});
