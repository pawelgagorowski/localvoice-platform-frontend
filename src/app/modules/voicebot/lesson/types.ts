export type LessonExercisesDto = {
  challengeForToday?: string[];
  chat?: string[];
  translate?: string[];
  chatDescription?: string;
  translatedChatDescription?: string;
  words?: WordsDto;
};

export type WordsExamplesDto = {
  [key: string]:
    | {
        examplesForWord: [string[]];
        sentences: string[];
      }
    | any;
};

export type WordsDto = WordsExamplesDto & {
  // eslint-disable-next-line camelcase
  lesson_description: string;
  // eslint-disable-next-line camelcase
  lesson_description_translate: string;
  // eslint-disable-next-line camelcase
  words_to_repeat: string[];
};

export type ExampleExercises = {
  exampleExercises: [string[]];
};
