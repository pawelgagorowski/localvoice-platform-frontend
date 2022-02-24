/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter, EntityState } from '~app/shared/vuex';
import { CourseStructureModel } from '../models/courseStructure';
import { LessonSummaryModel } from '../models/lessonSummary';

export const NAMESPACE = 'voicebotStructure';

type LessonsListEntity = EntityState<LessonSummaryModel> & { total: number };
type StructureEntity = EntityState<CourseStructureModel> & { total: number };

export interface StructureState {
  lessons: {
    lessonsList: LessonSummaryModel[];
    indexes: LessonsListEntity;
  };
  structure: {
    coursesList: CourseStructureModel[];
    indexes: StructureEntity;
  };
  subjects: {
    subjectsList: {
      [key: string]: {
        [key: string]: string[];
      };
    };
  };
}

export const lessonsEntityAdapter: EntityAdapter<LessonSummaryModel> = createEntityAdapter<LessonSummaryModel>();
export const structureEntityAdapter: EntityAdapter<CourseStructureModel> = createEntityAdapter<CourseStructureModel>();

export function initialState(): StructureState {
  return {
    lessons: {
      indexes: lessonsEntityAdapter.getInitialState({ total: 0 }),
      lessonsList: [],
    },
    structure: {
      coursesList: [],
      indexes: structureEntityAdapter.getInitialState({ total: 0 }),
    },
    subjects: {
      subjectsList: {},
    },
  };
}
