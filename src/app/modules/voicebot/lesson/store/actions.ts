import { RootState, store } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { authActions } from '~app/modules/auth/store';
import LessonModel from '~app/modules/voicebot/lesson/models/lesson';
import { PictureTarget, S3Credentials } from '~app/shared';
import { arePositiveNumbers } from '~app/shared/helpers/numbers';
import { getAttributeToUpdate } from '~app/shared/helpers/attributesToUpdate';
import { NAMESPACE, LessonState } from './state';
import { lessonMutations } from './mutation';
import lessonApi from '../service/lesson.api';
import { SentenceExampleStructure, SentenceExampleStructureFields } from '../types';

const createAction = createActionFactory<LessonState, RootState>();

export const actions = {
  fetchLesson: createAction(
    ({ commit }, lessonKeys: { courseName: string; categoryName: string; lessonName: string }) => {
      const key = `${lessonKeys.courseName}_${lessonKeys.categoryName}_${lessonKeys.lessonName}`;
      console.log('key', key);
      return lessonApi.getLesson(key).then((lesson: LessonModel | void) => {
        console.log('lesson', lesson);
        if (lesson) commit(lessonMutations.setLesson.local, lesson);
      });
    }
  ),
  cleanLesson: createAction(({ commit }) => {
    commit(lessonMutations.cleanLesson.local);
  }),
  updateLessonDescription: createAction(({ commit }, lessonDescription: string) => {
    commit(lessonMutations.changeLessonDescription.local, lessonDescription);
  }),
  updateTranslatedLessonDescription: createAction(({ commit }, translatedLessonDescription: string) => {
    commit(lessonMutations.changeTranslatedLessonDescription.local, translatedLessonDescription);
  }),
  updateSentence: createAction(
    (
      { commit },
      {
        sentence,
        sentenceIndex,
      }: {
        sentence: string;
        sentenceIndex: number;
      }
    ) => {
      if (arePositiveNumbers(sentenceIndex))
        commit(lessonMutations.changeSentence.local, {
          sentenceIndex,
          sentence,
        });
    }
  ),
  updateSentenceExample: createAction(
    (
      { commit },
      {
        sentenceIndex,
        sentenceExampleIndex,
        sentenceExampleStructure,
      }: { sentenceIndex: number; sentenceExampleIndex: number; sentenceExampleStructure: SentenceExampleStructure }
    ) => {
      console.log('updateSentenceExample', {
        sentenceIndex,
        sentenceExampleIndex,
        sentenceExampleStructure,
      });
      if (arePositiveNumbers(sentenceIndex, sentenceExampleIndex)) {
        const attributeToUpdate = getAttributeToUpdate<SentenceExampleStructure, SentenceExampleStructureFields>(
          sentenceExampleStructure,
          [
            SentenceExampleStructureFields.EXAMPLE,
            SentenceExampleStructureFields.TRANSLATED_EXAMPLE,
            SentenceExampleStructureFields.IMAGE_SRC,
          ]
        );
        commit(lessonMutations.changeSentenceExample.local, {
          sentenceIndex,
          sentenceExampleIndex,
          attributeToUpdate,
        });
      }
    }
  ),
  savePicture: createAction(
    (
      { commit },
      {
        sentenceIndex,
        sentenceExampleIndex,
        file,
        sentenceExampleStructure,
      }: {
        file: File;
        sentenceIndex: number;
        sentenceExampleIndex: number;
        sentenceExampleStructure: SentenceExampleStructure;
      }
    ) => {
      if (!file) return {};
      const arrayOfFilename = file.name.split('.');
      console.log('arrayOfFilename', arrayOfFilename);
      const type = arrayOfFilename[arrayOfFilename.length - 1];
      return store
        .dispatch(authActions.getS3Credentials, { pictureTarget: PictureTarget.LESSON_ICONS, type })
        .then(({ credentials, fullPath }: { credentials: S3Credentials; fullPath: string }) =>
          store.dispatch(authActions.saveInS3, { credentials, file }).then(() => {
            console.log('fullPath', fullPath);
            console.log('credentials', credentials);

            const attributeToUpdate = getAttributeToUpdate<SentenceExampleStructure, SentenceExampleStructureFields>(
              sentenceExampleStructure,
              [
                SentenceExampleStructureFields.EXAMPLE,
                SentenceExampleStructureFields.TRANSLATED_EXAMPLE,
                SentenceExampleStructureFields.IMAGE_SRC,
              ]
            );
            console.log('attributeToUpdate=savePicture', attributeToUpdate);
            commit(lessonMutations.changeSentenceExample.local, {
              sentenceIndex,
              sentenceExampleIndex,
              attributeToUpdate: { key: 'imageSrc', value: fullPath },
            });
          })
        );
    }
  ),
  removePicture: createAction(
    (
      { dispatch },
      {
        sentenceIndex,
        sentenceExampleIndex,
        sentenceExampleStructure,
      }: {
        sentenceIndex: number;
        sentenceExampleIndex: number;
        sentenceExampleStructure: SentenceExampleStructure;
      }
    ) => {
      const { imageSrc } = sentenceExampleStructure;
      console.log('sentenceExampleStructure', sentenceExampleStructure);
      return store
        .dispatch(authActions.removeFromS3, { imagesSrc: [imageSrc], pictureTarget: PictureTarget.STRUCTURE_ICONS })
        .then(() => {
          const updateStructureAction = 'updateSentenceExample';
          dispatch(updateStructureAction, {
            sentenceIndex,
            sentenceExampleIndex,
            sentenceExampleStructure: { imageSrc: '' },
          });
        });
    }
  ),
  addSentence: createAction(({ commit }) => {
    commit(lessonMutations.pushSentence.local);
  }),
  removeSentence: createAction(({ commit }, sentenceIndex: number) => {
    if (arePositiveNumbers(sentenceIndex)) commit(lessonMutations.removeSentence.local, sentenceIndex);
  }),
  insertSentence: createAction(({ commit }, sentenceIndex: number) => {
    if (arePositiveNumbers(sentenceIndex)) commit(lessonMutations.spliceSentence.local, sentenceIndex);
  }),
  insertSentenceExample: createAction(
    ({ commit }, { sentenceIndex, sentenceExampleIndex }: { sentenceIndex: number; sentenceExampleIndex: number }) => {
      if (arePositiveNumbers(sentenceIndex, sentenceExampleIndex))
        commit(lessonMutations.spliceSentenceExample.local, { sentenceIndex, sentenceExampleIndex });
    }
  ),
  addSentenceExample: createAction(({ commit }, sentenceIndex: number) => {
    console.log('addSentenceExample');
    if (arePositiveNumbers(sentenceIndex)) commit(lessonMutations.pushSentenceExample.local, sentenceIndex);
  }),
  removeSentenceExample: createAction(
    ({ commit }, { sentenceIndex, sentenceExampleIndex }: { sentenceIndex: number; sentenceExampleIndex: number }) => {
      if (arePositiveNumbers(sentenceIndex, sentenceExampleIndex))
        commit(lessonMutations.removeSentenceExample.local, { sentenceIndex, sentenceExampleIndex });
    }
  ),
};

export const lessonActions = createActionMap<typeof actions, LessonState, RootState>(NAMESPACE, actions);
