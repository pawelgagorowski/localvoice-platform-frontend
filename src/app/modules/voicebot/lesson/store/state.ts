import LessonModel from '../models/lesson';

export const NAMESPACE = 'voicebotLesson';

export interface LessonState {
  lesson: {
    lessonOnEdit: LessonModel;
  };
}

export function initialState(): LessonState {
  return {
    lesson: {
      lessonOnEdit: {
        courseName: '',
        categoryName: '',
        translatedCategoryName: '',
        subject: '',
        translatedSubject: '',
        exercises: {
          challengeList: [],
          chatExercise: {
            chatDescription: '',
            translatedChatContent: [],
            chatContent: [],
            translatedChatDescription: '',
          },
          sentenceExercise: {},
          lessonDescription: '',
          translatedlessonDescription: '',
          sentenceList: [],
        },
        business: '',
        tester: '',
      },
    },
  };
}
