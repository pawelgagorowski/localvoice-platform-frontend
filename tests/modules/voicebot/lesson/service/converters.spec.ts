import { lessonConverter } from '~app/modules/voicebot/lesson/service/converters';
import { LessonExercisesDto } from '~app/modules/voicebot/lesson/types';
import { LessonExercisesModel } from '~app/modules/voicebot/lesson/models/lessonExercises';
import { FormGroup } from '~app/shared/form';

describe('lessonConverter', () => {
  const fullInput: LessonExercisesDto = {
    challengeForToday: ['chalenge1', 'chalenge2', 'chalenge3'],
    chat: ['polish1', 'polish2', 'polish3'],
    translate: ['english1', 'english2', 'english3'],
    chatDescription: 'chat description',
    translatedChatDescription: 'opis chatu',
    words: {
      wordOne: {
        examplesForWord: [
          ['Rzeczownik', 'cinema', 'when have you been in cinema?', 'kiedy byłeś w kinie?', null, null, false],
        ],
        sentences: ['df'],
      },
      wordTwo: {
        examplesForWord: [['Czasownik', 'work', 'do you work today?', 'pracujesz dzisiaj?', null, null, false]],
        sentences: ['df'],
      },
      lesson_description: 'lesson description',
      lesson_description_translate: 'opis lekcji',
      words_to_repeat: ['wordOne', 'wordTwo'],
    },
  };

  it('should convert value to specific object', () => {
    const expectedOutput: LessonExercisesModel = {
      challengeList: ['chalenge1', 'chalenge2', 'chalenge3'],
      chatExercise: {
        chatDescription: 'chat description',
        translatedChatDescription: 'opis chatu',
        chatContent: ['polish1', 'polish2', 'polish3'],
        translatedChatContent: ['english1', 'english2', 'english3'],
      },
      sentenceExercise: [
        {
          sentence: 'wordOne',
          sentenceExample: [
            {
              example: 'when have you been in cinema?',
              translatedExample: 'kiedy byłeś w kinie?',
              imageSrc: null,
              isImage: false,
              typeOfExample: 'Rzeczownik',
              something: null,
            },
          ],
        },
        {
          sentence: 'wordTwo',
          sentenceExample: [
            {
              example: 'do you work today?',
              translatedExample: 'pracujesz dzisiaj?',
              imageSrc: null,
              isImage: false,
              typeOfExample: 'Czasownik',
              something: null,
            },
          ],
        },
      ],
      lessonDescription: 'lesson description',
      translatedLessonDescription: 'opis lekcji',
      sentenceList: ['wordOne', 'wordTwo'],
    };
    expect(lessonConverter.fromJson!(fullInput)).toEqual(expectedOutput);
  });

  it('should not convert value to specific object', () => {
    const notExpected: LessonExercisesModel = {
      challengeList: ['chalenge1', 'chalenge2', 'chalenge3'],
      chatExercise: {
        chatDescription: 'chat description',
        translatedChatDescription: 'opis chatu',
        chatContent: ['polish1', 'polish2', 'polish3'],
        translatedChatContent: ['english1', 'english2', 'english3'],
      },
      sentenceExercise: [
        {
          sentence: 'wordOne',
          sentenceExample: [
            {
              example: 'when have you been in cinema?',
              translatedExample: 'kiedy byłeś w kinie?',
              imageSrc: null,
              isImage: false,
              typeOfExample: 'Rzeczownik',
              something: null,
            },
          ],
        },
        {
          sentence: 'wordTwo',
          sentenceExample: [
            {
              example: '',
              translatedExample: 'pracujesz dzisiaj?',
              imageSrc: null,
              isImage: false,
              typeOfExample: 'Czasownik',
              something: null,
            },
          ],
        },
      ],
      lessonDescription: 'lesson description',
      translatedLessonDescription: 'opis lekcji',
      sentenceList: ['wordOne', 'wordTwo'],
    };
    expect(lessonConverter.fromJson!(fullInput)).not.toEqual(notExpected);
    expect(lessonConverter.fromJson!(fullInput)).not.toEqual({});
  });

  it('should return not empty object', () => {
    const notEmptyObject: LessonExercisesModel = {
      challengeList: [],
      chatExercise: {
        chatContent: [],
        chatDescription: '',
        translatedChatContent: [],
        translatedChatDescription: '',
      },
      lessonDescription: '',
      sentenceExercise: [],
      sentenceList: [],
      translatedLessonDescription: '',
    };
    expect(lessonConverter.fromJson!({})).toEqual(notEmptyObject);
    expect(lessonConverter.fromJson!(undefined)).toEqual(notEmptyObject);
  });

  it('should return partial output object', () => {
    const partialInput: LessonExercisesDto = {
      challengeForToday: ['chalenge1', 'chalenge2', 'chalenge3'],
      chat: ['polish1', 'polish2', 'polish3'],
      translate: ['english1', 'english2', 'english3'],
      chatDescription: 'chat description',
      translatedChatDescription: 'opis chatu',
    };

    const partialOutput = {
      challengeList: ['chalenge1', 'chalenge2', 'chalenge3'],
      chatExercise: {
        chatDescription: 'chat description',
        translatedChatDescription: 'opis chatu',
        chatContent: ['polish1', 'polish2', 'polish3'],
        translatedChatContent: ['english1', 'english2', 'english3'],
      },
      lessonDescription: '',
      sentenceExercise: [],
      sentenceList: [],
      translatedLessonDescription: '',
    };
    expect(lessonConverter.fromJson!(partialInput)).toEqual(partialOutput);
  });
});
