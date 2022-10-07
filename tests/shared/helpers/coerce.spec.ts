import { coerceArray } from '~app/shared/helpers/coerce';

describe('coerceArray fn', () => {
  it('should return array', () => {
    const Person = {
      name: 'Paweł',
      job: 'developer',
    };
    const undef = undefined;
    const nu = null;
    const name = 'Paweł';
    const expected = [{ job: 'developer', name: 'Paweł' }];

    expect(coerceArray(Person)).toEqual(expect.arrayContaining(expected));
    expect(coerceArray(undef)).toEqual([]);
    expect(coerceArray(name)).toEqual(['Paweł']);
    expect(coerceArray(nu)).toEqual([]);
    expect(coerceArray([nu])).toEqual([nu]);
  });
});
