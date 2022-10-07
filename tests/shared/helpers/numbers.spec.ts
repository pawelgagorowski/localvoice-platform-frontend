import { arePositiveNumbers } from '~app/shared/helpers/numbers';

describe('arePositiveNumbers fn', () => {
  it('should return true', () => {
    expect(arePositiveNumbers(2)).toBeTruthy();
    expect(arePositiveNumbers(0, 1, 2)).toBeTruthy();
  });
  it('should return false', () => {
    expect(arePositiveNumbers('0' as any, '1' as any, 2)).toBeFalsy();
    expect(arePositiveNumbers(-1, 2)).toBeFalsy();
    expect(arePositiveNumbers(undefined)).toBeFalsy();
    expect(arePositiveNumbers(null as any)).toBeFalsy();
  });
});
