/* eslint-disable max-classes-per-file */
import { JsonProperty } from '~app/shared/json-mapper';

export class LessonStructureModel {
  @JsonProperty('title')
  subject: string | undefined = undefined;

  @JsonProperty('description')
  translatedSubject: string | undefined = undefined;

  @JsonProperty('image')
  imageSrc: string | undefined = undefined;

  alt: string | undefined;
}
