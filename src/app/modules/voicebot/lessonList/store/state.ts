/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter, EntityState } from '~app/shared/vuex';
import LessonSummaryModel from '../models/lessonSummary';

export const NAMESPACE = 'voicebotLessonList';

type LessonsListEntity = EntityState<LessonSummaryModel> & { total: number };

export interface StructureState {
  lessons: {
    lessonList: LessonSummaryModel[];
    indexes: LessonsListEntity;
  };
}

export const lessonListEntityAdapter: EntityAdapter<LessonSummaryModel> = createEntityAdapter<LessonSummaryModel>();

export function initialState(): StructureState {
  return {
    lessons: {
      indexes: lessonListEntityAdapter.getInitialState({ total: 0 }),
      lessonList: []
    }
  };
}
