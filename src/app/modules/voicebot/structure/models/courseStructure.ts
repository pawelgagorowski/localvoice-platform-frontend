/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { JsonProperty } from '~app/shared/json-mapper';
import { voicebotStructureConverter } from '../service/converters';
import { CategoryStructureModel } from './categoryStructure';

export class CourseStructureModel {
  id: string = uuidv4();

  @JsonProperty({
    converter: voicebotStructureConverter,
  })
  categories: CategoryStructureModel[] | undefined = undefined;

  @JsonProperty('englishCourseName')
  subject: string | undefined = undefined;

  @JsonProperty('image')
  imageSrc: string | undefined = undefined;

  @JsonProperty('polishCourseName')
  translatedSubject: string | undefined = undefined;
}
