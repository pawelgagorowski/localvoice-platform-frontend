import { JsonProperty } from '~app/shared/json-mapper';
import { LessonStructureModel } from './lessonStructure';

export class CategoryStructureModel {
  @JsonProperty('title')
  subject: string | undefined = undefined;

  @JsonProperty('description')
  translatedSubject: string | undefined = undefined;

  @JsonProperty('image')
  imageSrc: string | undefined = undefined;

  alt: string | undefined = undefined;

  list: LessonStructureModel[] | undefined = undefined;
}
