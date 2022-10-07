/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { lessonListMutations } from './mutations';
import { NAMESPACE, StructureState } from './state';
import lessonListApi from '../service/lessonList.api';
import LessonSummaryModel from '../models/lessonSummary';

const createAction = createActionFactory<StructureState, RootState>();

export const actions = {
  fetchLessonsList: createAction(({ commit }, { pagination, sort, filter } = {}) => {
    lessonListApi.getLessonsList().then((data) => {
      commit(lessonListMutations.setLessonList.local, data.data);
    });
  }),
  removeLesson: createAction(({ commit }, lesson: LessonSummaryModel) => {
    console.log('removeLessonAction');
    console.log('lesson', lesson);
    const key = `${lesson.course}_${lesson.category}_${lesson.lesson}`;
    lessonListApi.removeLesson(key).then(() => {
      commit(lessonListMutations.removeLesson.local, lesson);
    });
  }),
};

export const lessonListActions = createActionMap<typeof actions, StructureState, RootState>(NAMESPACE, actions);
