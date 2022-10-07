/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter, EntityState } from '~app/shared/vuex';
import { CourseStructureModel } from '../models/courseStructure';

export const NAMESPACE = 'voicebotStructure';
type StructureEntity = EntityState<CourseStructureModel> & { total: number };

export interface StructureState {
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

export const structureEntityAdapter: EntityAdapter<CourseStructureModel> = createEntityAdapter<CourseStructureModel>();

export function initialState(): StructureState {
  return {
    structure: {
      coursesList: [],
      indexes: structureEntityAdapter.getInitialState({ total: 0 }),
    },
    subjects: {
      subjectsList: {},
    },
  };
}
