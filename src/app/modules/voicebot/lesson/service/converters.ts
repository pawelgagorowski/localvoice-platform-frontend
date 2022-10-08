/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { coerceObject, Converter, objectKeys } from '~app/shared';
import ChatExerciseModel from '../models/chatExerciseModel';
import { LessonExercisesModel } from '../models/lessonExercises';
import SentenceExampleExercisesModel from '../models/sentenceExampleExerciseModel';
import { LessonExercisesDto, SentenceExampleExercisesDto, WordsDto } from '../types';

export const lessonConverter: Converter = {
  fromJson(value: LessonExercisesDto): LessonExercisesModel {
    if (!value)
      return {
        challengeList: [],
        chatExercise: {
          chatContent: [],
          chatDescription: '',
          translatedChatContent: [],
          translatedChatDescription: ''
        },
        lessonDescription: '',
        sentenceExercise: [],
        sentenceList: [],
        translatedLessonDescription: ''
      };
    const lessonExercises = <LessonExercisesModel>{};
    lessonExercises.challengeList = value.challengeForToday || [];

    lessonExercises.chatExercise = <ChatExerciseModel>{};
    lessonExercises.chatExercise.chatDescription = value.chatDescription || '';
    lessonExercises.chatExercise.translatedChatDescription = value.translatedChatDescription || '';
    lessonExercises.chatExercise.chatContent = value.chat || [];
    lessonExercises.chatExercise.translatedChatContent = value.translate || [];
    lessonExercises.lessonDescription = value.words?.lesson_description || '';
    lessonExercises.translatedLessonDescription = value.words?.lesson_description_translate || '';
    lessonExercises.sentenceList = value.words?.words_to_repeat || [];
    lessonExercises.sentenceExercise = [];

    objectKeys<WordsDto>(coerceObject<WordsDto>(value.words)).forEach((key) => {
      if (key === 'lesson_description' || key === 'lesson_description_translate' || key === 'words_to_repeat') return;
      lessonExercises.sentenceExercise!.push({
        sentence: key as string,
        sentenceExample: getSentenceExample(value.words![key])
      });
    });
    return lessonExercises;
  },
  toJson(date: any): any {
    return 'hello from toJson';
  }
};

function getSentenceExample(sentence: {
  examplesForWord: [SentenceExampleExercisesDto];
}): SentenceExampleExercisesModel[] {
  return sentence.examplesForWord.map(
    (example: SentenceExampleExercisesDto): SentenceExampleExercisesModel => ({
      example: example[2],
      translatedExample: example[3],
      imageSrc: example[5],
      isImage: example[6],
      typeOfExample: example[0],
      something: example[4]
    })
  );
}
