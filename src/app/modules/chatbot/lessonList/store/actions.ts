/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { lessonListMutations } from './mutations';
import { NAMESPACE, ChatbotLessonListState } from './state';
import lessonListApi from '../service/lessonList.api';
import LessonSummaryModel from '../models/lessonSummary';

const createAction = createActionFactory<ChatbotLessonListState, RootState>();

export const actions = {
  fetchLessonsList: createAction(({ commit }, { pagination, sort, filter } = {}) => {
    lessonListApi.getLessonsList().then((data) => {
      console.log('data from chatbots', data);
      commit(lessonListMutations.setLessonList.local, data);
    });
  }),
  removeLesson: createAction(({ commit }, lesson: LessonSummaryModel) => {
    console.log('removeLessonAction');
    console.log('lesson', lesson);
    const key = `${lesson.courseName}_${lesson.categoryName}_${lesson.lessonName}`;
    lessonListApi.removeLesson(key).then(() => {
      commit(lessonListMutations.removeLesson.local, lesson);
    });
  }),
};

export const lessonListActions = createActionMap<typeof actions, ChatbotLessonListState, RootState>(NAMESPACE, actions);
