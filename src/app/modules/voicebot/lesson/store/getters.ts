/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, LessonState } from './state';

const createGetter = createGetterFactory<LessonState, RootState>();

export const getters = {
  getLessonOnEdit: createGetter((state) => state.lesson.lessonOnEdit),
  getNumberOfSentences: createGetter((state) =>
    state.lesson.lessonOnEdit.exercises?.sentenceExercise
      ? state.lesson.lessonOnEdit.exercises?.sentenceExercise?.length
      : 0
  )
};

export const lessonGetters = createGetterMap<typeof getters, LessonState, RootState>(NAMESPACE, getters);
