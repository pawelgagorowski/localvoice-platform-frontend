/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { coerceArray } from '~app/shared';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { StructureIndexes, StructureOperation } from '../types';
import { NAMESPACE, StructureState } from './state';

const createGetter = createGetterFactory<StructureState, RootState>();

export const getters = {
  getLessonsList: createGetter((state) => state.lessons.lessonsList),
  getStructure: createGetter((state) => state.structure.coursesList),
  getCourse: createGetter((state) => (courseIndex: number) => state.structure.coursesList[courseIndex]),
  getImageSrc: createGetter((state) => (indexes: StructureIndexes, operation: StructureOperation): (
    | string
    | undefined
  )[] => getImageSrc[operation](state, indexes)),
  getLinkedCoursesCategoriesAndLessons: createGetter((state) => state.subjects.subjectsList),
};

export const voicebotGetters = createGetterMap<typeof getters, StructureState, RootState>(NAMESPACE, getters);

// TODO change for indexing state
const getImageSrc = {
  course(state: StructureState, indexes: StructureIndexes) {
    if (!indexes.courseIndex) return [];
    const courseImageSrc = coerceArray<string>(state.structure.coursesList[indexes.courseIndex]!.imageSrc!);
    const categoryImagesSrc = coerceArray(state.structure.coursesList[indexes.courseIndex].categories).map(
      (category) => {
        if (category && category.imageSrc !== '') return category.imageSrc;
      }
    );
    const lessonImagesSrc: string[] = [];
    coerceArray(state.structure.coursesList[indexes.courseIndex].categories).forEach((category) => {
      coerceArray(category!.list).forEach((lesson) => {
        if (lesson && lesson.imageSrc !== '') lessonImagesSrc.push(lesson.imageSrc as string);
      });
    });
    return [...courseImageSrc, ...categoryImagesSrc, ...lessonImagesSrc];
  },
  category(state: StructureState, indexes: StructureIndexes) {
    if (!indexes.courseIndex || !indexes.categoryIndex) return [];
    const categoryImageSrc = coerceArray(
      state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].imageSrc
    );
    const lessonImagesSrc: string[] = [];
    coerceArray(state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list).forEach(
      (lesson) => {
        if (lesson && lesson.imageSrc !== '') lessonImagesSrc.push(lesson.imageSrc as string);
      }
    );
    return [...categoryImageSrc, ...lessonImagesSrc];
  },
  lesson(state: StructureState, indexes: StructureIndexes) {
    if (!indexes.courseIndex || !indexes.categoryIndex || !indexes.lessonIndex) return [];
    const lessonImageSrc = coerceArray(
      state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list![indexes.lessonIndex]
        .imageSrc
    );
    return lessonImageSrc;
  },
};
