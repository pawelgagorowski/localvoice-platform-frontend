/* eslint-disable import/no-cycle */
import VueI18n from 'vue-i18n';
import { FormGroup } from './form';

/* eslint-disable no-shadow */
export enum PictureTarget {
  STRUCTURE_ICONS = 'structure-icons',
  LESSON_ICONS = 'lesson-icons',
}

export type ObjectAttribute = {
  key: string;
  value: string;
};

export type S3Credentials = {
  fields: {
    [key: string]: string;
  };
  url: string;
};

export type QueryParams = {
  [key: string]: string;
};

export enum ValidationTarget {
  SAVE = 'save',
  TEST = 'test',
}

export type ValidationForm<T> = {
  test: {
    [key: string]: FormGroup<T>;
  };
  save: {
    [key: string]: FormGroup<T>;
  };
};

export type StructureValidationForm<T> = {
  [key: string]: ValidationForm<T>;
};

export type VoicebotButtonsText = {
  save: string;
  test: string;
  production: string;
};

export type ErrorFields = {
  minNumberOfSentences: string;
  minNumberOfCategories: string;
  minNumberOfLessons: string;
  maxNumberOfCategories: string;
  maxNumberOfLessons: string;
  required: string;
  email: string;
  minLength: string;
  includeCategoryWord: string;
  includeCourseWord: string;
  minLengthOfSentence: string;
  minLengthOfSentenceExample: string;
  matchWith: string;
};

export type ErrorType = keyof ErrorFields;

export type ErrorTranscription = {
  [K in keyof ErrorFields]: (arg?: string) => ErrorMessages;
};

export type ErrorMessages = {
  fieldMessage: VueI18n.TranslateResult;
  toastMessage: VueI18n.TranslateResult;
};

export interface ValidationError {
  type: ErrorType;
  arg: string;
  message?: string | VueI18n.LocaleMessages;
}

export interface ValidatorFn {
  (value: any, data?: any): ValidationError | null;
}

export interface ValidatorFactory<T> {
  (condition: T, type: ErrorType): ValidatorFn;
}
