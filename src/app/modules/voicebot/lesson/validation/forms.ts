import { FormGroup, required, minLength, min } from '~app/shared/form';
import SentenceExampleExercisesModel from '../models/sentenceExampleExerciseModel';
import SentenceExercisesModel from '../models/sentenceExerciseModel';
import { LessonBasicInformation, LessonDescription } from '../types';

export function createSentenceForm() {
  return new FormGroup<SentenceExercisesModel & { total: number }>({
    sentence: {
      validators: [required],
    },
    sentenceExample: {
      validators: [minLength(2, 'minLengthOfSentenceExample')],
    },
    total: {
      validators: [],
    },
  });
}

export function createSentenceExampleForm() {
  return new FormGroup<SentenceExampleExercisesModel>({
    example: {
      validators: [required],
    },
    translatedExample: {
      validators: [required],
    },
    imageSrc: {
      validators: [required],
    },
    something: {
      validators: [],
    },
    isImage: {
      validators: [],
    },
    typeOfExample: {
      validators: [],
    },
  });
}

export function createBasicInfoForm() {
  return new FormGroup<LessonBasicInformation>({
    selectedCourseName: {
      validators: [required],
    },
    selectedCategoryName: {
      validators: [required],
    },
    selectedLessonName: {
      validators: [required],
    },
  });
}

export function createLessonDescriptionForm() {
  return new FormGroup<LessonDescription>({
    lessonDescription: {
      validators: [required],
    },
    translatedLessonDescription: {
      validators: [required],
    },
    numberOfSentences: {
      validators: [min(1, 'minNumberOfSentences')],
    },
  });
}
