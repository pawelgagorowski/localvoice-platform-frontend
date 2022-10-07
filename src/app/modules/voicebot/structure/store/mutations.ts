/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */

import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { structureEntityAdapter, NAMESPACE, StructureState } from './state';
import { LessonStructureModel } from '../models';
import { CourseStructureModel } from '../models/courseStructure';
import { CategoryIndexes, CourseIndexes, LessonIndexes, StructureIndexes, UpdateStructureOperation } from '../types';
import { CategoryStructureModel } from '../models/categoryStructure';
import { coerceArray, ObjectAttribute } from '~app/shared';

const createMutation = createMutationFactory<StructureState>();

export const mutations = {
  setStructure: createMutation((state, payload: CourseStructureModel[]) => {
    structureEntityAdapter.addAll(payload, state.structure.indexes);
    state.structure.coursesList = payload;
  }),
  changeStructure: createMutation(
    (
      state,
      {
        indexes,
        attributesToUpdate,
        operation,
      }: {
        indexes: StructureIndexes;
        attributesToUpdate: ObjectAttribute;
        operation: 'course' | 'category' | 'lesson';
      }
    ) => {
      console.log('changeStructure mutation');
      updateStructureOperation[operation](state, indexes, attributesToUpdate);
      structureEntityAdapter.addAll(state.structure.coursesList, state.structure.indexes);
    }
  ),
  pushCourse: createMutation((state) => {
    console.log('pushCourse mutation');
    const newCourse: CourseStructureModel = {
      id: uuidv4(),
      subject: '',
      translatedSubject: '',
      imageSrc: '',
      categories: [],
    };
    state.structure.coursesList.push(newCourse);
  }),
  removeCourse: createMutation((state, indexes: CourseIndexes) => {
    console.log('removeCourse mutation');
    state.structure.coursesList.splice(indexes.courseIndex, 1);
  }),
  spliceCategory: createMutation((state, indexes: CategoryIndexes) => {
    console.log('spliceCategory mutation');
    const newCategory: CategoryStructureModel = {
      subject: '',
      translatedSubject: '',
      alt: '',
      imageSrc: '',
      list: [],
    };
    if (state.structure.coursesList[indexes.courseIndex].categories) {
      state.structure.coursesList[indexes.courseIndex].categories!.splice(indexes.categoryIndex + 1, 0, newCategory);
    }
  }),
  pushCategory: createMutation((state, indexes: CategoryIndexes) => {
    console.log('addCategory mutation');
    const newCategory: CategoryStructureModel = {
      subject: '',
      translatedSubject: '',
      alt: '',
      imageSrc: '',
      list: [],
    };
    if (indexes.courseIndex && state.structure.coursesList[indexes.courseIndex].categories)
      state.structure.coursesList[indexes.courseIndex].categories!.push(newCategory);
  }),
  removeCategory: createMutation((state, indexes: CategoryIndexes) => {
    console.log('removeCategory mutation');
    if (state.structure.coursesList[indexes.courseIndex].categories)
      state.structure.coursesList[indexes.courseIndex].categories!.splice(indexes.categoryIndex, 1);
  }),
  spliceLesson: createMutation((state, indexes: LessonIndexes) => {
    console.log('spliceLesson mutation');
    const newLesson: LessonStructureModel = {
      subject: '',
      translatedSubject: '',
      alt: '',
      imageSrc: '',
    };
    if (state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list!) {
      state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list!.splice(
        indexes.lessonIndex + 1,
        0,
        newLesson
      );
    }
  }),
  removeLesson: createMutation((state, indexes: LessonIndexes) => {
    console.log('removeLesson mutation');
    if (state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list!)
      state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list!.splice(
        indexes.lessonIndex,
        1
      );
  }),
  pushLesson: createMutation((state, indexes: CategoryIndexes) => {
    console.log('pushLesson mutation');
    const newLesson: LessonStructureModel = {
      subject: '',
      translatedSubject: '',
      alt: '',
      imageSrc: '',
    };
    if (state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex!].list) {
      coerceArray(state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list!).push(
        newLesson
      );
    }
  }),

  bindCoursesCategoriesAndLessons: createMutation((state) => {
    state.structure.coursesList.map((course) => {
      if (!course.subject) return;
      const courseName = course.subject;
      const categories: {
        [key: string]: string[];
      } = {};
      if (!course.categories || course.categories.length === 0) return;
      course.categories.map((category) => {
        if (!category.subject) return;
        categories[category.subject] = [];
        if (!category.list || category.list.length === 0) return;
        category.list.map((lesson) => {
          if (!lesson.subject) return;
          categories[category.subject!].push(lesson.subject);
        });
      });

      console.log('categories', categories);
      state.subjects.subjectsList[courseName] = categories;
    });
  }),
  // TODO refactor it
  bindCurrentCourseCategoriesAndLessons: createMutation((state, courseIndex: number) => {
    const course = state.structure.coursesList[courseIndex];
    if (!course.subject) return;
    const courseName = course.subject;
    const categories: {
      [key: string]: string[];
    } = {};
    if (!course.categories || course.categories.length === 0) return;
    course.categories.map((category) => {
      categories[category.subject!] = [];
      if (!category.list || category.list.length === 0) return;
      category.list.map((lesson) => {
        if (!lesson.subject) return;
        categories[category.subject!].push(lesson.subject);
      });
    });
    state.subjects.subjectsList[courseName] = categories;
  }),
};

export const voicebotMutations = createMutationMap<typeof mutations, StructureState>(NAMESPACE, mutations);

const updateStructureOperation: UpdateStructureOperation = {
  course(state: StructureState, indexes: CourseIndexes, attributeToUpdate: ObjectAttribute) {
    Vue.set(state.structure.coursesList[indexes.courseIndex], attributeToUpdate.key, attributeToUpdate.value);
  },
  category(state: StructureState, indexes: CategoryIndexes, attributeToUpdate: ObjectAttribute) {
    if (state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex]) {
      Vue.set(
        state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex],
        attributeToUpdate.key,
        attributeToUpdate.value
      );
    }
  },
  lesson(state: StructureState, indexes: LessonIndexes, attributeToUpdate: ObjectAttribute) {
    if (
      state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list![indexes.lessonIndex]
    ) {
      Vue.set(
        state.structure.coursesList[indexes.courseIndex].categories![indexes.categoryIndex].list![indexes.lessonIndex],
        attributeToUpdate.key,
        attributeToUpdate.value
      );
    }
  },
};
