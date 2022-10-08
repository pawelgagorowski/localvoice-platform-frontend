/* eslint-disable import/no-cycle */
import Vue from 'vue';
import { ObjectAttribute } from '~app/shared';
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import LessonModel from '../models/lesson';
import SentenceExampleExercisesModel from '../models/sentenceExampleExerciseModel';
import SentenceExercisesModel from '../models/sentenceExerciseModel';
import { NAMESPACE, LessonState } from './state';

const createMutation = createMutationFactory<LessonState>();

export const mutations = {
  setLesson: createMutation((state, lesson) => {
    state.lesson.lessonOnEdit = lesson;
  }),
  cleanLesson: createMutation((state) => {
    const emptyLesson: LessonModel = {
      courseName: '',
      categoryName: '',
      translatedCategoryName: '',
      subject: '',
      translatedSubject: '',
      exercises: {
        challengeList: [],
        chatExercise: {
          chatDescription: '',
          translatedChatContent: [],
          chatContent: [],
          translatedChatDescription: ''
        },
        sentenceExercise: [],
        lessonDescription: '',
        translatedLessonDescription: '',
        sentenceList: []
      },
      business: '',
      tester: ''
    };
    state.lesson.lessonOnEdit = emptyLesson;
  }),
  changeLessonDescription: createMutation((state, lessonDescription: string) => {
    state.lesson.lessonOnEdit.exercises!.lessonDescription = lessonDescription;
  }),
  changeTranslatedLessonDescription: createMutation((state, translatedLessonDescription: string) => {
    state.lesson.lessonOnEdit.exercises!.translatedLessonDescription = translatedLessonDescription;
  }),
  pushSentence: createMutation((state) => {
    console.log('pushCourse mutation');
    const newSentence: SentenceExercisesModel = {
      sentence: '',
      sentenceExample: []
    };
    state.lesson.lessonOnEdit.exercises!.sentenceExercise!.push(newSentence);
  }),
  removeSentence: createMutation((state, sentenceIndex: number) => {
    if (state.lesson.lessonOnEdit.exercises?.sentenceExercise)
      state.lesson.lessonOnEdit.exercises!.sentenceExercise!.splice(sentenceIndex, 1);
  }),
  spliceSentence: createMutation((state, sentenceIndex: number) => {
    const newSentence: SentenceExercisesModel = {
      sentence: '',
      sentenceExample: []
    };
    if (state.lesson.lessonOnEdit.exercises?.sentenceExercise) {
      state.lesson.lessonOnEdit.exercises!.sentenceExercise!.splice(sentenceIndex + 1, 0, newSentence);
    }
  }),
  changeSentence: createMutation(
    (
      state,
      {
        sentence,
        sentenceIndex
      }: {
        sentence: string;
        sentenceIndex: number;
      }
    ) => {
      state.lesson.lessonOnEdit.exercises!.sentenceExercise![sentenceIndex].sentence = sentence;
    }
  ),
  spliceSentenceExample: createMutation(
    (state, { sentenceIndex, sentenceExampleIndex }: { sentenceIndex: number; sentenceExampleIndex: number }) => {
      const newSentenceExample: SentenceExampleExercisesModel = {
        example: '',
        translatedExample: '',
        imageSrc: '',
        isImage: false,
        typeOfExample: 'none',
        something: null
      };
      if (state.lesson.lessonOnEdit.exercises!.sentenceExercise![sentenceIndex].sentenceExample) {
        state.lesson.lessonOnEdit.exercises!.sentenceExercise![sentenceIndex].sentenceExample!.splice(
          sentenceExampleIndex + 1,
          0,
          newSentenceExample
        );
      }
    }
  ),
  pushSentenceExample: createMutation((state, sentenceIndex: number) => {
    console.log('pushSentenceExample');
    const newSentenceExample: SentenceExampleExercisesModel = {
      example: '',
      translatedExample: '',
      imageSrc: '',
      isImage: false,
      typeOfExample: 'none',
      something: null
    };
    if (state.lesson.lessonOnEdit.exercises!.sentenceExercise![sentenceIndex].sentenceExample) {
      state.lesson.lessonOnEdit.exercises!.sentenceExercise![sentenceIndex].sentenceExample!.push(newSentenceExample);
    }
  }),
  removeSentenceExample: createMutation(
    (state, { sentenceIndex, sentenceExampleIndex }: { sentenceIndex: number; sentenceExampleIndex: number }) => {
      if (
        state.lesson.lessonOnEdit.exercises!.sentenceExercise![sentenceIndex].sentenceExample![sentenceExampleIndex]
      ) {
        state.lesson.lessonOnEdit.exercises!.sentenceExercise![sentenceIndex].sentenceExample!.splice(
          sentenceExampleIndex,
          1
        );
      }
    }
  ),
  changeSentenceExample: createMutation(
    (
      state,
      {
        attributeToUpdate,
        sentenceIndex,
        sentenceExampleIndex
      }: {
        attributeToUpdate: ObjectAttribute;
        sentenceIndex: number;
        sentenceExampleIndex: number;
      }
    ) => {
      console.log('changeSentenceExample');
      console.log('sentenceIndex', sentenceIndex);
      console.log('sentenceExampleIndex', sentenceExampleIndex);
      console.log('attributeToUpdate', attributeToUpdate);
      Vue.set(
        state.lesson.lessonOnEdit.exercises!.sentenceExercise![sentenceIndex].sentenceExample![sentenceExampleIndex],
        attributeToUpdate.key,
        attributeToUpdate.value
      );
    }
  )
};

export const lessonMutations = createMutationMap<typeof mutations, LessonState>(NAMESPACE, mutations);
