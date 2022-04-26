/* eslint-disable no-shadow */
import { FormGroup } from '~app/shared/form';
import SentenceExampleExercisesModel from './models/sentenceExampleExerciseModel';

export type LessonExercisesDto = {
  challengeForToday?: string[];
  chat?: string[];
  translate?: string[];
  chatDescription?: string;
  translatedChatDescription?: string;
  words?: WordsDto;
};

export type WordsExamplesDto = {
  [key: string]:
    | {
        examplesForWord: [string[]];
        sentences: string[];
      }
    | any;
};

export type WordsDto = WordsExamplesDto & {
  // eslint-disable-next-line camelcase
  lesson_description: string;
  // eslint-disable-next-line camelcase
  lesson_description_translate: string;
  // eslint-disable-next-line camelcase
  words_to_repeat: string[];
};

export type ExampleExercises = {
  exampleExercises: [SentenceExampleExercisesDto];
};

export type SentenceExampleExercisesDto = [string, string, string, string, null | string, null | string, boolean];

export type SentenceExampleStructure = {
  example?: string;
  translatedExample?: string;
  imageSrc?: string;
};

export enum SentenceExampleStructureFields {
  EXAMPLE = 'example',
  TRANSLATED_EXAMPLE = 'translatedExample',
  IMAGE_SRC = 'imageSrc',
}

export type LessonValidationForm<T> = {
  [key: string]: FormGroup<T>;
};

export type LessonQuery = {
  courseName: string;
  categoryName: string;
  lessonName: string;
};

export type LessonBasicInformation = {
  selectedCourseName: string;
  selectedCategoryName: string;
  selectedLessonName: string;
};

export type LessonDescription = {
  lessonDescription: string;
  translatedLessonDescription: string;
  numberOfSentences: number;
};

export enum LessonValidationType {
  SENTENCE = 'sentence',
  SENTENCE_EXAMPLE = 'sentenceExample',
}
