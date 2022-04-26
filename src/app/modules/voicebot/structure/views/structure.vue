<template>
  <div>
    <v-sheet v-sys-loading="loadingStatus" elevation="8" class="mb-10">
      <fixed-button
        :save-fn="saveCourseStructure"
        :test-fn="addCourseStructureToTestingEnvironment"
        :prod-fn="addCourseStructureToTestingEnvironment"
        :buttons-text="buttonsText"
        :is-fixed-button="false"
      ></fixed-button>
      <course-carousel
        :courses="courses"
        @validation="validation"
        @courseIndex="changeCourseIndex"
        @addCourse="addCourse"
        @removeCourse="removeCourse"
        @updateStructure="updateStructure"
        @savePicture="savePicture"
        @removePicture="removePicture"
      ></course-carousel>
    </v-sheet>
    <v-sheet v-if="courses.length > 0" elevation="8">
      <category-group
        :course="courses[courseIndex]"
        :course-index="courseIndex"
        @savePicture="savePicture"
        @removePicture="removePicture"
        @updateStructure="updateStructure"
        @removeCategory="comprehensivelyRemoveCategory"
        @addLesson="addLesson"
        @addCategory="addCategory"
        @insertLesson="insertLesson"
        @insertCategory="insertCategory"
        @removeLesson="comprehensivelyRemoveLesson"
        @validation="validation"
      ></category-group>
    </v-sheet>
    <fixed-button
      :save-fn="saveCourseStructure"
      :test-fn="addCourseStructureToTestingEnvironment"
      :prod-fn="addCourseStructureToTestingEnvironment"
      :buttons-text="buttonsText"
    ></fixed-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { layoutGetters } from '~app/layout/store';
import { loadingActions, loadingGetters } from '~app/modules/loading';
import FixedButton from '~app/shared/fixedButton/fixedButton.vue';
import { FormGroup } from '~app/shared/form';
import {
  StructureValidationForm,
  objectKeys,
  ValidationForm,
  ValidationTarget,
  coerceArray,
  VoicebotButtonsText,
} from '~app/shared';
import { translate } from '~app/core/i18n';
import { areExampleCorrect, fillUpValidationForm, deleteValidationFields } from '~app/shared/validation';
import { voicebotActions, voicebotGetters } from '../store';
import CategoryGroup from '../components/CategoryGroup.vue';
import CourseCarousel from '../components/CourseCarousel.vue';

import { CourseStructureModel } from '../models/courseStructure';
import { router } from '~app/core/router';

export default Vue.extend({
  metaInfo: {
    title: 'Table One',
  },
  components: {
    CategoryGroup,
    CourseCarousel,
    FixedButton,
  },
  data() {
    return {
      courseIndex: 0,
      validated: false,
      validationForm: {} as StructureValidationForm<CourseStructureModel>,
      buttonsText: {
        save: translate('save'),
        test: translate('voicebot.buttons.addStructureToTest'),
        production: translate('voicebot.buttons.addStructureToProd'),
      } as VoicebotButtonsText,
    };
  },
  computed: {
    ...mapGetters({
      layoutState: layoutGetters.getState,
      courses: voicebotGetters.getStructure,
      loadingStatus: loadingGetters.getStructureLoadingStatus,
    }),
  },
  watch: {
    courseIndex: {
      immediate: true,
      handler(courseIndex: string) {
        let id: FormGroup<CourseStructureModel>;
        objectKeys(this.validationForm).forEach((course) => {
          objectKeys(this.validationForm[course]).forEach((target) => {
            objectKeys(this.validationForm[course][target]).forEach((form) => {
              id = this.validationForm[course][target][form] as FormGroup<CourseStructureModel>;
              id.clearErrors();
            });
          });
        });
        this.validationForm = {} as StructureValidationForm<CourseStructureModel>;
        this.validationForm[courseIndex] = {} as ValidationForm<CourseStructureModel>;
        [ValidationTarget.SAVE, ValidationTarget.TEST].forEach((target) => {
          this.validationForm[courseIndex][target] = {};
        });
      },
    },
  },
  methods: {
    ...mapActions({
      linkCurrentCourseCategoriesAndLessons: voicebotActions.linkCurrentCourseCategoriesAndLessons,
      updateStructure: voicebotActions.updateStructure,
      savePicture: voicebotActions.savePicture,
      addLesson: voicebotActions.addLesson,
      insertLesson: voicebotActions.insertLesson,
      removeLesson: voicebotActions.removeLesson,
      insertCategory: voicebotActions.insertCategory,
      removeCategory: voicebotActions.removeCategory,
      addCategory: voicebotActions.addCategory,
      addCourse: voicebotActions.addCourse,
      removeCourse: voicebotActions.removeCourse,
      removePicture: voicebotActions.removePicture,
      setLoadingStatus: loadingActions.addVoicebotStructureLoadingStatus,
    }),
    comprehensivelyRemoveCategory(data: { courseIndex: number; categoryIndex: number; validationIds: string[] }) {
      deleteValidationFields({
        validationIds: coerceArray(data.validationIds),
        validationForm: this.validationForm[this.courseIndex],
      });
      this.removeCategory({ courseIndex: data.courseIndex, categoryIndex: data.categoryIndex });
    },
    comprehensivelyRemoveLesson(data: {
      courseIndex: number;
      categoryIndex: number;
      lessonIndex: number;
      validationId: string;
    }) {
      deleteValidationFields({
        validationIds: coerceArray(data.validationId),
        validationForm: this.validationForm[this.courseIndex],
      });
      this.removeLesson({
        courseIndex: data.courseIndex,
        categoryIndex: data.categoryIndex,
        lessonIndex: data.lessonIndex,
      });
    },
    changeCourseIndex(courseIndex: number) {
      this.courseIndex = courseIndex;
    },
    saveCourseStructure() {
      console.log(
        'areExampleCorrect',
        areExampleCorrect({ validationForm: this.validationForm[this.courseIndex], target: ValidationTarget.SAVE })
      );
    },
    addCourseStructureToTestingEnvironment() {
      const result = areExampleCorrect({
        validationForm: this.validationForm[this.courseIndex],
        target: ValidationTarget.TEST,
      });
      console.log('result', result);
      if (!result.isCorrect)
        // router.app.$toast.success(
        //   `Before you add course structure to testing environment you have to: ${result.errorMessages}`
        // );
        router.app.$toast.success(this.$t('message.hello'));
      else console.log('jest ok!!');
      this.linkCurrentCourseCategoriesAndLessons(this.courseIndex);
    },
    validation(validation: {
      courseIndex: number;
      id: string;
      data: FormGroup<CourseStructureModel>;
      targets: ValidationTarget[];
    }) {
      if (!this.validationForm[validation.courseIndex])
        this.validationForm[validation.courseIndex] = {} as ValidationForm<CourseStructureModel>;
      const validationForm = this.validationForm[validation.courseIndex];

      fillUpValidationForm({
        id: validation.id,
        targets: validation.targets,
        validationForm,
        data: validation.data,
      });
    },
  },
});

// function areExampleCorrect<T>(form: ValidationForm<T>, target: ValidationTarget): boolean {
//   const lessons = form[target];
//   let id: FormGroup<T>;
//   let isAnyError = false;
//   objectKeys(lessons).forEach((key) => {
//     id = lessons[key];
//     id.validate();
//     if (id.isAnyError) isAnyError = true;
//   });
//   return !isAnyError;
// }
</script>

<style scope>
.course-counter {
  z-index: 1;
}

.slide-card {
  padding: 10px;
}

.myFlex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slide-square {
  height: 315px;
  margin-left: 20px;
  border-left: 1px dashed #339ef3;
  margin-top: -312px;
}

.v-slide-group__next {
  align-items: flex-start !important;
}

.v-slide-group__prev {
  align-items: flex-start !important;
}

.mySquare2 {
  height: 300px;
  position: absolute;
  width: 200px;
  margin-top: 100px !important;
  margin-left: 31px;
  border-left: 1px dashed #339ef3;
  top: 534px;
}
</style>
