/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { translate } from '~app/core/i18n';

import { ErrorTranscription, ErrorType, ValidatorFactory, ValidatorFn } from '../types';

export const defaultMessages: ErrorTranscription = {
  // required: i18n.t('Field is required'),
  // minLength: i18n.t('The input is less than {requiredLength} characters long'),
  // matchWith: i18n.t('The value must match with "{name}" field value'),
  // email: i18n.t('The value is not a valid email address'),
  // min: i18n.t('The value must be greater than or equal {min}'),
  // max: i18n.t('The value must be less than or equal {max}'),
  // ipAddress: i18n.t('The value is not a valid IP address'),
  // bsDate: i18n.t('Invalid date'),
  // NOT_UNIQUE: i18n.t('Value must be unique'),

  required: () => ({
    fieldMessage: translate('voicebot.fieldValidators.required'),
    toastMessage: translate('voicebot.toastValidators.required'),
  }),
  minLength: (requiredLength?: string) => ({
    fieldMessage: translate('voicebot.fieldValidators.minLength', { requiredLength }),
    toastMessage: translate('voicebot.toastValidators.minLength', { requiredLength }),
  }),
  minLengthOfSentence: (requiredLength?: string) => ({
    fieldMessage: translate('voicebot.fieldValidators.minLengthOfSentence', { requiredLength }),
    toastMessage: translate('voicebot.toastValidators.minLengthOfSentence', { requiredLength }),
  }),
  minLengthOfSentenceExample: (requiredLength?: string) => ({
    fieldMessage: ``,
    toastMessage: `Fill up minimum ${requiredLength} sentences example per sentence`,
  }),
  matchWith: (name?: string) => ({
    fieldMessage: translate('voicebot.fieldValidators.matchWith', { name }),
    toastMessage: translate('voicebot.toastValidators.matchWith', { name }),
  }),
  minNumberOfSentences: (min?: string) => ({
    fieldMessage: '',
    toastMessage: translate('voicebot.toastValidators.minNumberOfSentences', { min }),
  }),
  minNumberOfCategories: (min?: string) => ({
    fieldMessage: '',
    toastMessage: translate('voicebot.toastValidators.minNumberOfCategories', { min }),
  }),
  maxNumberOfCategories: (max?: string) => ({
    fieldMessage: '',
    toastMessage: translate('voicebot.toastValidators.maxNumberOfCategories', { max }),
  }),
  minNumberOfLessons: (min?: string) => ({
    fieldMessage: '',
    toastMessage: translate('voicebot.toastValidators.maxNumberOfCategories', { min }),
  }),
  maxNumberOfLessons: (max?: string) => ({
    fieldMessage: '',
    toastMessage: translate('voicebot.toastValidators.maxNumberOfCategories', { max }),
  }),
  email: () => ({
    fieldMessage: translate('voicebot.fieldValidators.email'),
    toastMessage: translate('voicebot.toastValidators.email'),
  }),
  // min: 'The value must be greater than or equal {min}',
  // max: 'The value must be less than or equal {max}',
  // minElementsInArray: 'Number of example of each sentence must be grater than {minimum}',
  // maxElementsInArray: 'Number of example of each sentence must be less than or equal {max}',
  // ipAddress: 'The value is not a valid IP address',
  // bsDate: 'Invalid date',
  // NOT_UNIQUE: 'Value must be unique',
  includeCourseWord: () => ({
    fieldMessage: '`The input must include "course" word',
    toastMessage: 'Fill up fields with some special words',
  }),
  includeCategoryWord: () => ({
    fieldMessage: 'Value must include "category" word',
    toastMessage: 'Fill up fields with some special words',
  }),
};

const isEmpty = (value: any): boolean => value == null || value.length === 0;

export const required: ValidatorFn = (value: any) => (isEmpty(value) ? { type: 'required', arg: '' } : null);

export const includeCourseWord: ValidatorFn = (value: string) => {
  const pattern = /course/i;
  return value.match(pattern) ? null : { type: 'includeCategoryWord', arg: '' };
};

export const includeCategoryWord: ValidatorFn = (value: string) => {
  const pattern = /category/i;
  return value.match(pattern) ? null : { type: 'includeCategoryWord', arg: '' };
};

// export const requiredIf: ValidatorFactory = (condition: (data: any) => boolean) => (value: any, data: any) =>
//   condition(data) ? required(value) : null;

export const matchWith: ValidatorFactory<string> = (name: string, type = 'matchWith') => (value: any, data: any) => {
  if (isEmpty(value)) {
    return null;
  }

  return data[name] === value ? null : { type, arg: name };
};

// https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const email: ValidatorFn = (value: string) => {
  if (isEmpty(value)) {
    return null;
  }
  return EMAIL_REGEXP.test(value) ? null : { type: 'email', arg: '' };
};

export const min: ValidatorFactory<number> = (min: number, type: ErrorType) => (value: any) => {
  if (isEmpty(value)) {
    return null;
  }
  const number = parseFloat(value);
  return !Number.isNaN(Number(number)) && number < min ? { type, arg: min.toString() } : null;
};

export const max: ValidatorFactory<number> = (max: number, type: ErrorType) => (value: any) => {
  if (isEmpty(value)) {
    return null;
  }

  const number = parseFloat(value);
  return !Number.isNaN(Number(number)) && value > max ? { type, arg: max.toString() } : null;
};

export const minLength: ValidatorFactory<number> = (min: number, type: ErrorType) => (value: string) => {
  const number = value.length;
  return !Number.isNaN(Number(number)) && number < min ? { type, arg: min.toString() } : null;
};

// TODO equal
// TODO minLength
// TODO maxLength
// TODO pattern

// https://github.com/nodejs/node/blob/b023d61716ddc9cd97cc148bb8d237ec8d894d2b/lib/internal/net.js#L12
export const { isIPv4, isIPv6, isIP } = (() => {
  const v4Seg = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
  const v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
  const IPv4Reg = new RegExp(`^${v4Str}$`);

  const v6Seg = '(?:[0-9a-fA-F]{1,4})';
  const IPv6Reg = new RegExp(
    '^(' +
      `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` +
      `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` +
      `(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|` +
      `(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|` +
      `(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|` +
      `(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|` +
      `(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|` +
      `(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` +
      ')(%[0-9a-zA-Z]{1,})?$'
  );

  function isIPv4(s: string): boolean {
    return IPv4Reg.test(s);
  }

  function isIPv6(s: string): boolean {
    return IPv6Reg.test(s);
  }

  function isIP(s: string): number {
    if (isIPv4(s)) return 4;
    if (isIPv6(s)) return 6;
    return 0;
  }

  return { isIPv4, isIPv6, isIP };
})();

// export const ipAddress: ValidatorFactory = (version?: 4 | 6) => (value: string) => {
//   if (isEmpty(value)) {
//     return null;
//   }

//   const type = 'ipAddress';
//   const res = isIP(value);

//   if (version && res !== version) {
//     return { type, args: { version } };
//   }

//   return res > 0 ? null : { type };
// };
