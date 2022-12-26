<template>
  <div>
    <basic-information
      :is-lesson-fetched="isLessonFetched"
      :course-name-on-edit="[lesson.courseName]"
      :selected-fields-validation-id="selectedFieldsValidationId"
      :description-fields-validation-id="descriptionFieldsValidationId"
      :category-name-on-edit="[lesson.categoryName]"
      :lesson-name-on-edit="[lesson.subject]"
      :lesson-description="lesson.exercises.lessonDescription"
      :translated-lesson-description="lesson.exercises.translatedLessonDescription"
      :save-fn="saveLesson"
      :test-fn="addLessonToTestingEnvironment"
      :prod-fn="addLessonToTestingEnvironment"
      :buttons-text="buttonsText"
      :number-of-sentences="getNumberOfSentences"
      @updateLessonDescription="updateLessonDescription"
      @updateTranslatedLessonDescription="updateTranslatedLessonDescription"
      @createNewLesson="createNewLesson"
      @validation="validation"
    ></basic-information>
    <div v-for="(sentenceExercise, sentenceIndex) in lesson.exercises.sentenceExercise" :key="sentenceIndex">
      <the-sentence
        :sentence-exercise="sentenceExercise"
        :sentence-index="sentenceIndex"
        @updateSentence="updateSentence"
        @updateSentenceExample="updateSentenceExample"
        @insertSentence="insertSentence"
        @removeSentence="comprehensivelyRemoveSentence"
        @insertSentenceExample="insertSentenceExample"
        @addSentenceExample="addSentenceExample"
        @removeSentenceExample="comprehensivelyRemoveSentenceExample"
        @savePicture="savePicture"
        @removePicture="removePicture"
        @validation="validation"
      ></the-sentence>
    </div>
    <fixed-button
      :save-fn="saveLesson"
      :test-fn="addLessonToTestingEnvironment"
      :prod-fn="addLessonToTestingEnvironment"
      :buttons-text="buttonsText"
    ></fixed-button>
    <div class="d-flex justify-center mb-10 mt-5">
      <v-btn :disabled="false" color="success" @click="addSentence()"> {{ $t('buttons.addExample') }} </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { v4 as uuid } from 'uuid';
import { router } from '~app/core/router';
import { coerceArray, QueryParams, VoicebotButtonsText, ValidationForm, ValidationTarget } from '~app/shared';
import { areExampleCorrect, fillUpValidationForm, deleteValidationFields } from '~app/shared/validation';
import { FormGroup } from '~app/shared/form';
import { getQueryParameters } from '~app/shared/helpers/query';
import FixedButton from '~app/shared/fixedButton/fixedButton.vue';
import { translate } from '~app/core/i18n';
import BasicInformation from '../components/BasicInformation.vue';
import TheSentence from '../components/TheSentence.vue';
import { LessonExercisesModel } from '../models/lessonExercises';
import { lessonGetters } from '../store';
import { lessonActions } from '../store/actions';
import { LessonQuery } from '../types';

export default Vue.extend({
  components: {
    BasicInformation,
    TheSentence,
    FixedButton
  },
  data: () => {
    return {
      transition: false,
      hover: false,
      fab: false,
      isLessonFetched: false,
      validationForm: {} as ValidationForm<LessonExercisesModel>,
      selectedFieldsValidationId: uuid(),
      descriptionFieldsValidationId: uuid(),
      buttonsText: {
        save: translate('save'),
        test: translate('buttons.addLessonToTest'),
        production: translate('buttons.addLessonToProd')
      } as VoicebotButtonsText
    };
  },
  computed: {
    ...mapGetters({
      lesson: lessonGetters.getLessonOnEdit,
      getNumberOfSentences: lessonGetters.getNumberOfSentences
    })
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(): any {
        const queryParameters = getQueryParameters<LessonQuery>(
          this.$route.query as QueryParams,
          'courseName',
          'categoryName',
          'lessonName'
        );
        if (queryParameters) {
          this.selectedFieldsValidationId = uuid();
          this.descriptionFieldsValidationId = uuid();
          this.validationForm = {} as ValidationForm<LessonExercisesModel>;
          this.fetchLesson(queryParameters).then(() => {
            this.isLessonFetched = true;
          });
        }
      }
    }
  },
  created() {
    this.createNewLesson();
  },
  methods: {
    ...mapActions({
      fetchLesson: lessonActions.fetchLesson,
      updateLessonDescription: lessonActions.updateLessonDescription,
      updateTranslatedLessonDescription: lessonActions.updateTranslatedLessonDescription,
      updateSentence: lessonActions.updateSentence,
      updateSentenceExample: lessonActions.updateSentenceExample,
      insertSentence: lessonActions.insertSentence,
      removeSentence: lessonActions.removeSentence,
      addSentence: lessonActions.addSentence,
      insertSentenceExample: lessonActions.insertSentenceExample,
      removeSentenceExample: lessonActions.removeSentenceExample,
      addSentenceExample: lessonActions.addSentenceExample,
      savePicture: lessonActions.savePicture,
      removePicture: lessonActions.removePicture,
      cleanLesson: lessonActions.cleanLesson
    }),
    validation(validation: { id: string; data: FormGroup<LessonExercisesModel>; targets: ValidationTarget[] }) {
      fillUpValidationForm({
        id: validation.id,
        targets: validation.targets,
        validationForm: this.validationForm,
        data: validation.data
      });
      console.log('validationForm', this.validationForm);
    },
    comprehensivelyRemoveSentence(data: { sentenceIndex: number; validationIds: string[] }) {
      deleteValidationFields({ validationIds: coerceArray(data.validationIds), validationForm: this.validationForm });
      this.removeSentence(data.sentenceIndex);
    },
    comprehensivelyRemoveSentenceExample(data: {
      sentenceIndex: number;
      sentenceExampleIndex: number;
      validationId: string;
    }) {
      deleteValidationFields({ validationIds: coerceArray(data.validationId), validationForm: this.validationForm });

      this.removeSentenceExample({
        sentenceIndex: data.sentenceIndex,
        sentenceExampleIndex: data.sentenceExampleIndex
      });
    },
    saveLesson() {
      const result = areExampleCorrect({ validationForm: this.validationForm, target: ValidationTarget.SAVE });
    },
    addLessonToTestingEnvironment() {
      const result = areExampleCorrect({ validationForm: this.validationForm, target: ValidationTarget.TEST });
      console.log('result', result);
      if (!result.isCorrect) router.app.$toast.success(`Masz następujące błędy: ${result.errorMessages}`);
      else console.log('jest ok!!');
    },
    createNewLesson() {
      this.isLessonFetched = false;
      this.validationForm = {} as ValidationForm<LessonExercisesModel>;
      this.cleanLesson();
    }
  }
});
</script>

<style scoped>
.chat-number {
  margin-top: 101px !important;
}
.line-1 hr {
  border: 0;
  border-bottom: 2px dashed #aebfd9;
}
.mySquare {
  height: 287px;
  position: absolute;
  width: 200px;
  margin-left: -45px;
  border-left: 1px dashed #339ef3;
  border-bottom: 1px dashed #339ef3;
  z-index: 0;
}

.mySquare1 {
  height: 362px;
  position: absolute;
  width: 200px;
  margin-top: 100px !important;
  margin-left: -45px;
  border-left: 1px dashed #339ef3;
  border-bottom: 1px dashed #339ef3;
}

.mySquare2 {
  height: 977px;
  position: absolute;
  width: 200px;
  margin-left: -45px;
  border-left: 1px dashed #5ab55e;
  margin-top: 330px !important;
}

.mySquare3 {
  height: 287px;
  position: absolute;
  width: 200px;
  margin-left: -45px;
  border-left: 1px dashed #5ab55e;
  margin-top: 330px !important;
}

.mySquare4 {
  height: 240px;
  position: absolute;
  width: 200px;
  margin-left: -45px;
  border-left: 1px dashed #339ef3;
  margin-top: 132px !important;
}
</style>
