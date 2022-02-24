import { JsonProperty } from '~app/shared/json-mapper';
import { LessonExercisesModel } from './lessonExercises';
import { lessonConverter } from '../service/converters';

export default class LessonModel {
  @JsonProperty({
    converter: lessonConverter,
    name: 'todaysLesson',
  })
  exercises: LessonExercisesModel | undefined = undefined;

  business: string | undefined = undefined;

  @JsonProperty('course')
  courseName: string | undefined = undefined;

  @JsonProperty('category')
  categoryName: string | undefined = undefined;

  @JsonProperty('translatedCategory')
  translatedCategoryName: string | undefined = undefined;

  @JsonProperty('lesson')
  subject: string | undefined = undefined;

  @JsonProperty('translatedLesson')
  translatedSubject: string | undefined = undefined;

  tester: string | undefined = undefined;
}
