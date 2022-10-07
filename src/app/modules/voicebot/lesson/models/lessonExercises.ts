import ChatExerciseModel from './chatExerciseModel';
import SentenceExerciseModel from './sentenceExerciseModel';

export class LessonExercisesModel {
  challengeList?: string[] | undefined = undefined;

  chatExercise?: ChatExerciseModel | undefined = undefined;

  sentenceExercise: SentenceExerciseModel[] | undefined = undefined;

  lessonDescription: string | undefined = undefined;

  sentenceList: string[] | undefined = undefined;

  translatedLessonDescription: string | undefined = undefined;
}
