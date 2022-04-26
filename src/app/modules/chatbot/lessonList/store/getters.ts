/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, ChatbotLessonListState } from './state';

const createGetter = createGetterFactory<ChatbotLessonListState, RootState>();

export const getters = {
  getLessonList: createGetter((state) => state.lessons.lessonList),
};

export const lessonListGetters = createGetterMap<typeof getters, ChatbotLessonListState, RootState>(NAMESPACE, getters);
