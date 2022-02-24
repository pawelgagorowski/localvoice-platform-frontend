/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState, store } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { ObjectAttribute, PictureTarget, S3Credentials } from '~app/shared/types';
import { authActions } from '~app/modules/auth/store';
import { voicebotMutations } from './mutations';
import { NAMESPACE, StructureState } from './state';
import {
  StructureUnit,
  StructureDetailsToUpdate,
  StructureFields,
  StructureIndexes,
  StructureOperation,
} from '../types';
import structureApi from '../service/structure.api';
import { voicebotGetters } from './getters';
import { loadingActions } from '~app/modules/loading';
import { arePositiveNumbers } from '~app/shared/helpers/numbers';

const createAction = createActionFactory<StructureState, RootState>();

export const actions = {
  fetchLessonsList: createAction(({ commit }, { pagination, sort, filter } = {}) => {
    structureApi.getLessonsList().then((data) => {
      commit(voicebotMutations.setLessonsList.local, data.data);
    });
  }),
  fetchStructure: createAction(({ commit }, { pagination, sort, filter } = {}) => {
    return structureApi.getStructure().then((data) => {
      commit(voicebotMutations.setStructure.local, data.data);
      store.dispatch(loadingActions.addVoicebotStructureLoadingStatus, false);
      store.dispatch(voicebotActions.linkCoursesCategoriesAndLessons);
      // router.app.$toast.success('Structure was successfully fetched');
      // commit(voicebotMutations.setStructure.local, []);
    });
  }),
  updateStructure: createAction(({ commit }, data: StructureDetailsToUpdate) => {
    const attributesToUpdate = getAttributeToUpdate<StructureFields, StructureUnit>(data, [
      StructureUnit.SUBJECT,
      StructureUnit.TRANSLATED_SUBJECT,
      StructureUnit.IMAGE_SRC,
    ]);
    console.log('attributesToUpdate', attributesToUpdate);
    const indexes = getAttributesToUpdate<StructureIndexes, StructureUnit>(data, [
      StructureUnit.COURSE_INDEX,
      StructureUnit.CATEGORY_INDEX,
      StructureUnit.LESSON_INDEX,
    ]);
    commit(voicebotMutations.changeStructure.local, { indexes, attributesToUpdate, operation: data.operation });
  }),
  addCourse: createAction(({ commit }) => {
    console.log('addCourse action');
    commit(voicebotMutations.pushCourse.local);
  }),
  removeCourse: createAction(({ commit, rootGetters }, indexes: StructureIndexes) => {
    console.log('removeCourse action');
    if (arePositiveNumbers(indexes.courseIndex)) {
      commit(voicebotMutations.removeCourse.local, indexes);
      const imagesSrc: string[] = rootGetters[voicebotGetters.getImageSrc](indexes, StructureOperation.COURSE);
      store.dispatch(authActions.removeFromS3, { imagesSrc, pictureTarget: PictureTarget.STRUCTURE_ICONS });
    }
  }),
  addCategory: createAction(({ commit }, indexes: StructureIndexes) => {
    console.log('addCategory action');
    if (arePositiveNumbers(indexes.courseIndex)) commit(voicebotMutations.pushCategory.local, indexes);
  }),
  insertCategory: createAction(({ commit }, indexes: StructureIndexes) => {
    console.log('insertCategory action');
    if (arePositiveNumbers(indexes.courseIndex, indexes.categoryIndex))
      commit(voicebotMutations.spliceCategory.local, indexes);
  }),
  removeCategory: createAction(({ commit, rootGetters }, indexes: StructureIndexes) => {
    console.log('removeCategory');
    if (arePositiveNumbers(indexes.courseIndex, indexes.categoryIndex)) {
      commit(voicebotMutations.removeCategory.local, indexes);
      const imagesSrc: string[] = rootGetters[voicebotGetters.getImageSrc](indexes, StructureOperation.CATEGORY);
      store.dispatch(authActions.removeFromS3, { imagesSrc, pictureTarget: PictureTarget.STRUCTURE_ICONS });
    }
  }),
  addLesson: createAction(({ commit }, indexes: StructureIndexes) => {
    console.log('addLesson action date', indexes);
    if (arePositiveNumbers(indexes.courseIndex, indexes.categoryIndex))
      commit(voicebotMutations.pushLesson.local, indexes);
  }),
  insertLesson: createAction(({ commit }, indexes: StructureIndexes) => {
    console.log('insertLesson');
    if (arePositiveNumbers(indexes.courseIndex, indexes.categoryIndex, indexes.lessonIndex))
      commit(voicebotMutations.spliceLesson.local, indexes);
  }),
  removeLesson: createAction(({ commit, rootGetters }, indexes: StructureIndexes) => {
    console.log('removeLesson');
    if (arePositiveNumbers(indexes.courseIndex, indexes.categoryIndex, indexes.lessonIndex)) {
      const imagesSrc: string[] = rootGetters[voicebotGetters.getImageSrc](indexes, StructureOperation.LESSON);
      commit(voicebotMutations.removeLesson.local, indexes);
      store.dispatch(authActions.removeFromS3, { imagesSrc, pictureTarget: PictureTarget.STRUCTURE_ICONS });
    }
  }),
  savePicture: createAction(({ commit }, data: StructureDetailsToUpdate) => {
    if (!data.file) return {};
    const arrayOfFilename = data.file.name.split('.');
    console.log('arrayOfFilename', arrayOfFilename);
    const type = arrayOfFilename[arrayOfFilename.length - 1];
    return store
      .dispatch(authActions.getS3Credentials, { pictureTarget: PictureTarget.STRUCTURE_ICONS, type })
      .then(({ credentials, fullPath }: { credentials: S3Credentials; fullPath: string }) =>
        store.dispatch(authActions.saveInS3, { credentials, file: data.file }).then(() => {
          console.log('fullPath', fullPath);
          console.log('credentials', credentials);

          const indexes = getAttributesToUpdate<StructureIndexes, StructureUnit>(data, [
            StructureUnit.COURSE_INDEX,
            StructureUnit.CATEGORY_INDEX,
            StructureUnit.LESSON_INDEX,
          ]);
          commit(voicebotMutations.changeStructure.local, {
            indexes,
            attributesToUpdate: { key: 'imageSrc', value: fullPath },
            operation: data.operation,
          });
        })
      );
  }),
  removePicture: createAction(({ dispatch }, data: StructureDetailsToUpdate) => {
    const { imageSrc } = data;
    console.log('removePIcture', data);
    return store
      .dispatch(authActions.removeFromS3, { imagesSrc: [imageSrc], pictureTarget: PictureTarget.STRUCTURE_ICONS })
      .then(() => {
        const updateStructureAction = 'updateStructure';
        dispatch(updateStructureAction, { ...data, imageSrc: '' });
      });
  }),
  linkCoursesCategoriesAndLessons: createAction(({ commit }) => {
    console.log('linkCoursesCategoriesAndLessons');
    commit(voicebotMutations.bindCoursesCategoriesAndLessons.local);
  }),
  linkCurrentCourseCategoriesAndLessons: createAction(({ commit }, courseIndex: number) => {
    console.log('linkCurrentCourseCategoriesAndLessons');
    commit(voicebotMutations.bindCurrentCourseCategoriesAndLessons.local, courseIndex);
  }),
};

export const voicebotActions = createActionMap<typeof actions, StructureState, RootState>(NAMESPACE, actions);

export function getAttributesToUpdate<T, K>(value: Partial<T>, poosibleAttributesToUpdate: K[]): Partial<T> {
  return Object.keys(value).reduce((acc, it) => {
    if (poosibleAttributesToUpdate.indexOf(it as any) >= 0) {
      acc[it as keyof T] = value[it as keyof T];
    }
    return acc;
  }, {} as Partial<T>);
}

export function getAttributeToUpdate<T, K>(value: Partial<T>, poosibleAttributesToUpdate: K[]): ObjectAttribute {
  return Object.keys(value).reduce((acc, it) => {
    if (poosibleAttributesToUpdate.indexOf(it as any) >= 0) {
      acc.key = it;
      // @ts-expect-error rework it
      acc.value = value[it];
    }
    return acc;
  }, {} as ObjectAttribute);
}
