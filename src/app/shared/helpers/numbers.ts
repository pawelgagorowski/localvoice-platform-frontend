export const arePositiveNumbers = (...numbers: (number | undefined)[]): boolean => {
  let arePositive = true;
  numbers.forEach((number) => {
    if (!Number.isInteger(number)) {
      arePositive = false;
      return;
    }
    if (!/^\+?(0|[1-9]\d*)$/.test(number!.toString())) {
      arePositive = false;
    }
  });
  return !!arePositive;
};
