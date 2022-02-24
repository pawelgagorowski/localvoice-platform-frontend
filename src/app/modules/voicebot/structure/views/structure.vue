<template>
  <div>
    <v-sheet v-sys-loading="loadingStatus" elevation="8" class="mb-10">
      <div class="d-flex justify-start flex-wrap">
        <v-btn class="ma-2" dark color="danger" @click="saveCourse()">
          <v-icon>mdi-plus</v-icon>
          zapisz strukturę kursu
        </v-btn>
        <div>
          <v-btn class="ma-2" color="primary" @click="addCourseToTestingEnvironment()">
            <v-icon>mdi-plus</v-icon> Dodaj kurs do wersji testowej
          </v-btn>
        </div>
        <div>
          <v-btn class="ma-2" color="success"> <v-icon>mdi-plus</v-icon> Dodaj kurs do wersji produkcyjnej </v-btn>
        </div>
      </div>
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
        @removeCategory="removeCategory"
        @addLesson="addLesson"
        @addCategory="addCategory"
        @insertLesson="insertLesson"
        @insertCategory="insertCategory"
        @removeLesson="removeLesson"
        @validation="validation"
      ></category-group>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { layoutGetters } from '~app/layout/store';
import { voicebotActions, voicebotGetters } from '../store';
import CategoryGroup from '../components/CategoryGroup.vue';
import CourseCarousel from '../components/CourseCarousel.vue';
import { objectKeys } from '~app/shared';
import { FormGroup } from '~app/shared/form';
import { CourseStructureModel } from '../models/courseStructure';
import { loadingActions, loadingGetters } from '~app/modules/loading';
import { ValidationForm } from '../types';

export default Vue.extend({
  metaInfo: {
    title: 'Table One',
  },
  components: {
    CategoryGroup,
    CourseCarousel,
  },
  data() {
    return {
      courseIndex: 0,
      validated: false,
      validationForm: {} as ValidationForm<CourseStructureModel>,
    };
  },
  computed: {
    ...mapGetters({
      layoutState: layoutGetters.getState,
      courses: voicebotGetters.getStructure,
      loadingStatus: loadingGetters.getStructureLoadingStatus,
    }),
    // backgroundForSlides() {
    //   const backgroundColor = this.layoutState.layoutMode === LayoutMode.WHITE ? '#fff' : '#242939';
    //   return backgroundColor;
    // },
  },
  watch: {
    courseIndex: {
      immediate: true,
      handler(courseIndex: string) {
        let id: FormGroup<CourseStructureModel>;
        objectKeys(this.validationForm).forEach((course) => {
          objectKeys(this.validationForm[course]).forEach((form) => {
            id = this.validationForm[course][form] as FormGroup<CourseStructureModel>;
            id.clearErrors();
          });
        });
        this.validationForm = {};
        this.validationForm[courseIndex] = {};
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
    changeCourseIndex(courseIndex: number) {
      this.courseIndex = courseIndex;
    },
    saveCourse() {
      console.log('saveCourse');
    },
    addCourseToTestingEnvironment() {
      const course = this.validationForm[this.courseIndex];
      let id: FormGroup<CourseStructureModel>;

      objectKeys(course).forEach((key) => {
        id = course[key];
        id.validate();
      });
      this.linkCurrentCourseCategoriesAndLessons(this.courseIndex);
    },
    validation(validation: { courseIndex: number; id: string; data: FormGroup<CourseStructureModel> }) {
      if (!this.validationForm[validation.courseIndex]) this.validationForm[validation.courseIndex] = {};
      if (!this.validationForm[validation.courseIndex][validation.id])
        this.validationForm[validation.courseIndex][validation.id] = {} as FormGroup<CourseStructureModel>;
      this.validationForm[validation.courseIndex][validation.id] = validation.data;
    },
  },
});
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
