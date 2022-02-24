/* eslint-disable import/no-cycle */
import { ObjectAttribute } from '~app/shared';
import { FormGroup } from '~app/shared/form';
import { StructureState } from './store';

/* eslint-disable no-shadow */
export type Category = {
  imageAlt: string;
  translatedSubject: string;
  imageSrc: string;
  subject: string;
};

export type ListDto = {
  list: StructureCategoryDto[] | undefined;
};

export type StructureCourseDto = {
  [key: string]: {
    list: StructureCategoryDto[] | undefined;
  };
} & ListDto;

export type StructureCategoryDto = {
  title: string;
  description: string;
  alt: string;
  image: string;
};

export type StructureLessonDto = {
  title: string;
  description: string;
  alt: string;
  image: string;
};

export enum StructureOperation {
  COURSE = 'course',
  CATEGORY = 'category',
  LESSON = 'lesson',
}

export type StructureDetailsToUpdate = {
  title?: string;
  description?: string;
  file?: File;
  operation: StructureOperation;
  courseIndex: number;
  categoryIndex?: number;
  lessonIndex?: number;
  imageSrc?: string;
};

export type StructureFields = {
  title?: string;
  file?: File;
  description?: string;
};

export type StructureIndexes = {
  courseIndex?: number;
  categoryIndex?: number;
  lessonIndex?: number;
};

export type LessonIndexes = Required<StructureIndexes>;
export type CategoryIndexes = {
  courseIndex: number;
  categoryIndex: number;
};
export type CourseIndexes = {
  courseIndex: number;
};

export enum StructureUnit {
  SUBJECT = 'subject',
  TRANSLATED_SUBJECT = 'translatedSubject',
  IMAGE_SRC = 'imageSrc',
  COURSE_INDEX = 'courseIndex',
  CATEGORY_INDEX = 'categoryIndex',
  LESSON_INDEX = 'lessonIndex',
}

export type LessonListHeaders = {
  test: string;
  value: string;
  align?: string;
  sortable?: string;
};

export type ValidationForm<T> = {
  [key: string]: {
    [key: string]: FormGroup<T>;
  };
};

export type UpdateStructureOperation = {
  course(state: StructureState, indexes: StructureIndexes, attributeToUpdate: ObjectAttribute): void;
  category(state: StructureState, indexes: StructureIndexes, attributeToUpdate: ObjectAttribute): void;
  lesson(state: StructureState, indexes: StructureIndexes, attributeToUpdate: ObjectAttribute): void;
};
