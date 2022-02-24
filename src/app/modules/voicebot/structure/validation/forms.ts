import { FormGroup, required, includeCourseWord, includeCategoryWord } from '~app/shared/form';
import { LessonStructureModel } from '../models';
import { CategoryStructureModel } from '../models/categoryStructure';
import { CourseStructureModel } from '../models/courseStructure';

export function createLessonForm() {
  return new FormGroup<LessonStructureModel>({
    subject: {
      validators: [required],
    },
    translatedSubject: {
      validators: [required],
    },
    imageSrc: {
      validators: [required],
    },
    alt: {},
  });
}

export function createCategoryForm() {
  return new FormGroup<CategoryStructureModel>({
    subject: {
      validators: [required, includeCategoryWord],
    },
    translatedSubject: {
      validators: [required],
    },
    imageSrc: {
      validators: [required],
    },
    alt: {},
    list: {},
  });
}

export function createCourseForm() {
  return new FormGroup<CourseStructureModel>({
    id: {},
    subject: {
      validators: [required, includeCourseWord],
    },
    translatedSubject: {
      validators: [required],
    },
    imageSrc: {
      validators: [required],
    },
    categories: {},
  });
}
