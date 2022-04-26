/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { ChatbotLessonListEntityAdapter, NAMESPACE, ChatbotLessonListState } from './state';
import LessonSummaryModel from '../models/lessonSummary';

const createMutation = createMutationFactory<ChatbotLessonListState>();

export const mutations = {
  setLessonList: createMutation((state, lessonList: LessonSummaryModel[]) => {
    ChatbotLessonListEntityAdapter.addMany(lessonList, state.lessons.indexes);
    state.lessons.lessonList = lessonList;
  }),
  removeLesson: createMutation((state, lessonToRemove: LessonSummaryModel) => {
    console.log('lessonToRemove', lessonToRemove);
    state.lessons.lessonList = state.lessons.lessonList.reduce((acc, lesson) => {
      if (lesson.id !== lessonToRemove.id) acc.push(lesson);
      return acc;
    }, [] as LessonSummaryModel[]);
  }),
};

export const lessonListMutations = createMutationMap<typeof mutations, ChatbotLessonListState>(NAMESPACE, mutations);
