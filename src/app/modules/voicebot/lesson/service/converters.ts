/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import { coerceObject, Converter, objectKeys } from '~app/shared';
import ChatExerciseModel from '../models/chatExerciseModel';
import { LessonExercisesModel } from '../models/lessonExercises';
import SentenceExercisesModel from '../models/sentenceExerciseModel';
import { ExampleExercises, LessonExercisesDto, WordsDto } from '../types';

export const lessonConverter: Converter = {
  fromJson(value: LessonExercisesDto): LessonExercisesModel {
    if (!value) return <LessonExercisesModel>{};
    const lessonExercises = <LessonExercisesModel>{};
    lessonExercises.challengeList = value.challengeForToday || [];

    lessonExercises.chatExercise = <ChatExerciseModel>{};
    lessonExercises.chatExercise.chatDescription = value.chatDescription || '';
    lessonExercises.chatExercise.translatedChatDescription = value.translatedChatDescription || '';
    lessonExercises.chatExercise.chatContent = value.chat || [];
    lessonExercises.chatExercise.translatedChatContent = value.translate || [];
    lessonExercises.lessonDescription = value.words?.lesson_description || '';
    lessonExercises.translatedlessonDescription = value.words?.lesson_description_translate || '';
    lessonExercises.sentenceList = value.words?.words_to_repeat || [];
    lessonExercises.sentenceExercise = <SentenceExercisesModel>{};
    objectKeys<WordsDto>(coerceObject<WordsDto>(value.words)).forEach((key) => {
      if (key === 'lesson_description' || key === 'lesson_description_translate' || key === 'words_to_repeat') return;
      lessonExercises.sentenceExercise![key] = <ExampleExercises>{};
      lessonExercises.sentenceExercise![key].exampleExercises = value.words![key].examplesForWord;
    });
    return lessonExercises;
  },
  toJson(date: any): any {
    return 'hello from toJson';
  },
};
