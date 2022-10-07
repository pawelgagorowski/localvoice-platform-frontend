/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import { coerceArray, Converter, objectKeys } from '~app/shared';
import { StructureLessonDto, StructureCategoryDto, StructureCourseDto } from '../types';

export const voicebotStructureConverter: Converter = {
  fromJson(value: StructureCourseDto): any {
    if (!value) return {};
    const listOfCategories: { subject: string; translatedSubject: string; imageSrc: string; list: any }[] = [];
    coerceArray(value.list).map((category: StructureCategoryDto | undefined) => {
      if (!category) return;
      const categoryTitle: string | undefined | number = objectKeys(value).find(
        (title: string | number) => title === category.title
      );
      if (typeof categoryTitle !== 'string' || !value[categoryTitle] || !value[categoryTitle].list) return;
      listOfCategories.push({
        list: value[categoryTitle].list!.map((lesson: StructureLessonDto) => ({
          subject: lesson.title || undefined,
          translatedSubject: lesson.description || undefined,
          imageSrc: lesson.image || undefined,
        })),
        subject: category.title,
        translatedSubject: category.description,
        imageSrc: category.image,
      });
    });
    return listOfCategories;
  },
  toJson(date: Date): number | null {
    return date && date.getTime ? date.getTime() : null;
  },
};
