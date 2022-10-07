/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter, EntityState } from '~app/shared/vuex';
import LessonSummaryModel from '../models/lessonSummary';

export const NAMESPACE = 'chatbotLessonList';

type ChatbotLessonListEntity = EntityState<LessonSummaryModel> & { total: number };

export interface ChatbotLessonListState {
  lessons: {
    lessonList: LessonSummaryModel[];
    indexes: ChatbotLessonListEntity;
  };
}

export const ChatbotLessonListEntityAdapter: EntityAdapter<LessonSummaryModel> = createEntityAdapter<LessonSummaryModel>();

export function initialState(): ChatbotLessonListState {
  return {
    lessons: {
      indexes: ChatbotLessonListEntityAdapter.getInitialState({ total: 0 }),
      lessonList: [],
    },
  };
}
