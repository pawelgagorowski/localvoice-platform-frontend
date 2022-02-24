import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { NAMESPACE, LessonState } from './state';
import { ValidationMutations } from './mutation';
import LessonModel from '~app/modules/voicebot/lesson/models/lesson';
import lessonApi from '../service/lesson.api';

const createAction = createActionFactory<LessonState, RootState>();

export const actions = {
  fetchLesson: createAction(
    ({ commit }, lessonKeys: { courseName: string; categoryName: string; lessonName: string }) => {
      const key = `${lessonKeys.courseName}_${lessonKeys.categoryName}_${lessonKeys.lessonName}`;
      console.log('key', key);
      return lessonApi.getLesson(key).then((lesson: LessonModel | void) => {
        console.log('lesson', lesson);
        if (lesson) commit(ValidationMutations.setLesson.local, lesson);
      });
    }
  ),
};

export const lessonActions = createActionMap<typeof actions, LessonState, RootState>(NAMESPACE, actions);
