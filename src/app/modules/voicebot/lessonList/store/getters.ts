/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, StructureState } from './state';

const createGetter = createGetterFactory<StructureState, RootState>();

export const getters = {
  getLessonList: createGetter((state) => state.lessons.lessonList),
};

export const lessonListGetters = createGetterMap<typeof getters, StructureState, RootState>(NAMESPACE, getters);
