import { lessonConverter } from '~app/modules/voicebot/lesson/service/converters';
import { LessonExercisesDto } from '~app/modules/voicebot/lesson/types';
import { LessonExercisesModel } from '~app/modules/voicebot/lesson/models/lessonExercises';

describe('lessonConverter', () => {
  const fullInput: LessonExercisesDto = {
    challengeForToday: ['chalenge1', 'chalenge2', 'chalenge3'],
    chat: ['polish1', 'polish2', 'polish3'],
    translate: ['english1', 'english2', 'english3'],
    chatDescription: 'chat description',
    translatedChatDescription: 'opis chatu',
    words: {
      wordOne: {
        examplesForWord: [['fsdfsd']],
        sentences: ['df'],
      },
      wordTwo: {
        examplesForWord: [['word1Examples1', 'word1Examples', 'word1Examples']],
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
      sentenceExercise: {
        wordOne: {
          exampleExercises: [['fsdfsd']],
        },
        wordTwo: {
          exampleExercises: [['word1Examples1', 'word1Examples', 'word1Examples']],
        },
      },
      lessonDescription: 'lesson description',
      translatedlessonDescription: 'opis lekcji',
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
      sentenceExercise: {
        wordOne: {
          exampleExercises: [['fsdfsd']],
        },
        wordTwo: {
          exampleExercises: [['word1Examples1', 'word1Examples', 'word1Examples']],
        },
      },
      lessonDescription: 'lesson description',
      translatedlessonDescription: 'opis lekcji',
      // 2x wordsTwo
      sentenceList: ['wordTwo', 'wordTwo'],
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
      sentenceExercise: {},
      sentenceList: [],
      translatedlessonDescription: '',
    };
    expect(lessonConverter.fromJson!({})).toEqual(notEmptyObject);
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
      sentenceExercise: {},
      sentenceList: [],
      translatedlessonDescription: '',
    };
    expect(lessonConverter.fromJson!(partialInput)).toEqual(partialOutput);
  });

  it('should return empty object', () => {
    expect(lessonConverter.fromJson!(undefined)).toEqual({});
  });
});
