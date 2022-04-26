<template>
  <v-col cols="12">
    <base-card>
      <v-card-title>
        <div v-if="isLessonFetched" class="d-flex justify-space-between flex-wrap">
          <v-btn class="ma-2" dark color="success" @click="$emit('createNewLesson')">
            <v-icon>mdi-plus</v-icon>
            {{ $t('voicebot.buttons.createLesson') }}
          </v-btn>
        </div>
        <div v-else class="d-flex justify-space-between flex-wrap">
          <v-btn class="ma-2" dark color="success">
            <router-link
              :to="{
                name: 'list-of-lessons',
              }"
              style="text-decoration: none; color: inherit"
            >
              <v-icon>mdi-pencil</v-icon>
              {{ $t('voicebot.buttons.editLesson') }}
            </router-link>
          </v-btn>
        </div>
        <fixed-button
          :save-fn="saveFn"
          :test-fn="testFn"
          :prod-fn="prodFn"
          :buttons-text="buttonsText"
          :is-fixed-button="false"
        ></fixed-button>
      </v-card-title>
      <v-card-title>Stwórz lekcję dla swoich podopiecznych</v-card-title>
      <v-card-text>
        <form-control-state v-slot:default="{ message }" :errors="basicInfoForm.errors.selectedCourseName">
          <v-select
            v-model="selectedCourseName"
            :error-messages="message"
            :items="courseNames"
            :label="$t('voicebot.labels.courseName')"
            @change="changeCourseSelectField($event)"
          />
        </form-control-state>
        <form-control-state v-slot:default="{ message }" :errors="basicInfoForm.errors.selectedCategoryName">
          <v-select
            v-model="selectedCategoryName"
            :error-messages="message"
            :items="categoryNames"
            :label="$t('voicebot.labels.categoryName')"
            @change="changeCategorySelectField($event)"
          />
        </form-control-state>
        <form-control-state v-slot:default="{ message }" :errors="basicInfoForm.errors.selectedLessonName">
          <v-select
            v-model="selectedLessonName"
            :error-messages="message"
            :items="lessonNames"
            :label="$t('voicebot.labels.lessonName')"
            @change="changeLessonSelectField($event)"
          />
        </form-control-state>
        <form-control-state v-slot:default="{ message }" :errors="lessonDescriptionForm.errors.lessonDescription">
          <v-textarea
            flat
            :error-messages="message"
            :value="lessonDescription"
            clear-icon
            hint="To musi być wyrażenie składające się z kilku słów"
            :label="$t('voicebot.labels.lessonDescription')"
            @input="$emit('updateLessonDescription', $event)"
          />
        </form-control-state>
        <form-control-state
          v-slot:default="{ message }"
          :errors="lessonDescriptionForm.errors.translatedLessonDescription"
        >
          <v-textarea
            flat
            :error-messages="message"
            :value="translatedLessonDescription"
            clear-icon
            hint="To musi być wyrażenie składające się z kilku słów"
            :label="$t('voicebot.labels.translatedLessonDescription')"
            @input="$emit('updateTranslatedLessonDescription', $event)"
          />
        </form-control-state>
      </v-card-text>
    </base-card>
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapGetters } from 'vuex';
import FixedButton from '~app/shared/fixedButton/fixedButton.vue';
import { objectKeys, ValidationTarget, VoicebotButtonsText } from '~app/shared';
import { FormControlState } from '~app/shared/form';
import { emitValidation } from '~app/shared/validation';
import { voicebotGetters } from '~app/modules/voicebot/structure/store';
import { createBasicInfoForm, createLessonDescriptionForm } from '../validation/forms';
import { LessonBasicInformation, LessonDescription } from '../types';

export default Vue.extend({
  components: {
    FormControlState,
    FixedButton,
  },
  props: {
    isLessonFetched: {
      type: Boolean,
    },
    courseNameOnEdit: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    categoryNameOnEdit: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    lessonNameOnEdit: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    lessonDescription: {
      type: String,
      default: () => '',
    },
    translatedLessonDescription: {
      type: String,
      default: () => '',
    },
    selectedFieldsValidationId: {
      type: String,
      default: () => '',
    },
    descriptionFieldsValidationId: {
      type: String,
      default: () => '',
    },
    numberOfSentences: {
      type: Number,
      default: 0,
    },
    saveFn: {
      type: Function,
      default: () => '',
    },
    testFn: {
      type: Function,
      default: () => '',
    },
    prodFn: {
      type: Function,
      default: () => '',
    },
    buttonsText: {
      type: Object as PropType<VoicebotButtonsText>,
      default: () => ({
        save: '',
        test: '',
        production: '',
      }),
    },
  },
  data: () => {
    const basicInfoForm = createBasicInfoForm();
    const lessonDescriptionForm = createLessonDescriptionForm();
    return {
      courseNames: [] as string[],
      selectedCourseName: '',
      categoryNames: [] as string[],
      selectedCategoryName: '',
      lessonNames: [] as string[],
      selectedLessonName: '',
      basicInfoForm,
      lessonDescriptionForm,
    };
  },
  computed: {
    ...mapGetters({
      linkedCoursesCategoriesAndLessons: voicebotGetters.getLinkedCoursesCategoriesAndLessons,
    }),
  },
  watch: {
    lessonDescription: {
      immediate: true,
      handler(lessonDescription) {
        console.log('lessonDescription watcher', lessonDescription);
        emitValidation<LessonDescription>(
          {
            lessonDescription,
            translatedLessonDescription: this.translatedLessonDescription,
            numberOfSentences: this.numberOfSentences,
          },
          {
            form: this.lessonDescriptionForm,
            instance: this,
            validationId: this.descriptionFieldsValidationId,
            targets: [ValidationTarget.TEST],
          }
        );
      },
    },
    translatedLessonDescription: {
      immediate: true,
      handler(translatedLessonDescription) {
        emitValidation<LessonDescription>(
          {
            lessonDescription: this.lessonDescription,
            translatedLessonDescription,
            numberOfSentences: this.numberOfSentences,
          },
          {
            form: this.lessonDescriptionForm,
            instance: this,
            validationId: this.descriptionFieldsValidationId,
            targets: [ValidationTarget.TEST],
          }
        );
      },
    },
    numberOfSentences: {
      immediate: true,
      handler(numberOfSentences) {
        emitValidation<LessonDescription>(
          {
            lessonDescription: this.lessonDescription,
            translatedLessonDescription: this.translatedLessonDescription,
            numberOfSentences,
          },
          {
            form: this.lessonDescriptionForm,
            instance: this,
            validationId: this.descriptionFieldsValidationId,
            targets: [ValidationTarget.TEST],
          }
        );
      },
    },
    isLessonFetched: {
      immediate: true,
      handler(isLessonFetched) {
        if (isLessonFetched) {
          this.courseNames = this.courseNameOnEdit;
          this.selectedCourseName = this.courseNameOnEdit[0];
          this.categoryNames = this.categoryNameOnEdit;
          this.selectedCategoryName = this.categoryNameOnEdit[0];
          this.lessonNames = this.lessonNameOnEdit;
          this.selectedLessonName = this.lessonNameOnEdit[0];
        } else {
          this.courseNames = this.getCourseNames();
          this.selectedCourseName = '';
          this.selectedCategoryName = '';
          this.selectedLessonName = '';
          this.categoryNames = [];
          this.lessonNames = [];
        }
      },
    },
    selectedCourseName: {
      immediate: true,
      handler(selectedCourseName) {
        console.log('selectedCourseName watcher', selectedCourseName);
        emitValidation<LessonBasicInformation>(
          {
            selectedCourseName,
            selectedCategoryName: this.selectedCategoryName,
            selectedLessonName: this.selectedLessonName,
          },
          {
            form: this.basicInfoForm,
            instance: this,
            validationId: this.selectedFieldsValidationId,
            targets: [ValidationTarget.SAVE, ValidationTarget.TEST],
          }
        );
      },
    },
    selectedCategoryName: {
      immediate: true,
      handler(selectedCategoryName) {
        console.log('selectedCategoryName watcher', selectedCategoryName);
        emitValidation<LessonBasicInformation>(
          {
            selectedCourseName: this.selectedCourseName,
            selectedCategoryName,
            selectedLessonName: this.selectedLessonName,
          },
          {
            form: this.basicInfoForm,
            instance: this,
            validationId: this.selectedFieldsValidationId,
            targets: [ValidationTarget.SAVE, ValidationTarget.TEST],
          }
        );
      },
    },
    selectedLessonName: {
      immediate: true,
      handler(selectedLessonName) {
        console.log('selectedLessonName watcher', selectedLessonName);
        emitValidation<LessonBasicInformation>(
          {
            selectedCourseName: this.selectedCourseName,
            selectedCategoryName: this.selectedCategoryName,
            selectedLessonName,
          },
          {
            form: this.basicInfoForm,
            instance: this,
            validationId: this.selectedFieldsValidationId,
            targets: [ValidationTarget.SAVE, ValidationTarget.TEST],
          }
        );
      },
    },
  },
  methods: {
    getCourseNames(): any {
      return objectKeys(this.linkedCoursesCategoriesAndLessons);
    },
    changeCourseSelectField(selectedCourseName: string) {
      const structure = this.linkedCoursesCategoriesAndLessons;
      this.selectedCourseName = selectedCourseName;
      this.$emit('courseField', selectedCourseName);
      this.categoryNames = objectKeys(structure[selectedCourseName]) as string[];
    },
    changeCategorySelectField(selectedCategoryName: string) {
      const structure = this.linkedCoursesCategoriesAndLessons;
      this.selectedCategoryName = selectedCategoryName;
      this.$emit('categoryField', selectedCategoryName);
      this.lessonNames = structure[this.selectedCourseName][this.selectedCategoryName];
    },
    changeLessonSelectField(selectedLessonName: string) {
      this.selectedLessonName = selectedLessonName;
      this.$emit('lessonField', selectedLessonName);
    },
  },
});
</script>
