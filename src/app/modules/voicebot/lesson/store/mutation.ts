/* eslint-disable import/no-cycle */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, LessonState } from './state';

const createMutation = createMutationFactory<LessonState>();

export const mutations = {
  setLesson: createMutation((state, lesson) => {
    state.lesson.currentLesson = lesson;
  }),
};

export const ValidationMutations = createMutationMap<typeof mutations, LessonState>(NAMESPACE, mutations);
