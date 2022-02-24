<template>
  <base-card class="px-5 pl-10">
    <v-card-title class="d-flex justify-space-between">
      Kurs
      <div class="mt-4">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn class="mb-4 mr-4" color="primary" fab small v-on="on" @click.stop="$emit('addCourse')">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Dodaj kurs</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mb-4"
              color="warning"
              fab
              small
              v-on="on"
              @click.stop="
                $emit('removeCourse', {
                  courseIndex,
                })
              "
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
          <span>Usuń kurs</span>
        </v-tooltip>
      </div>
      <div>
        <v-icon color="primary" @click.stop="removeCourseIndex()"> mdi-chevron-left </v-icon>
        <v-icon color="primary" @click.stop="addCourseIndex()"> mdi-chevron-right </v-icon>
      </div>
    </v-card-title>
    <v-card-text>
      <v-carousel v-model="courseIndex" hide-delimiters :show-arrows="false" height="150px" light>
        <v-carousel-item v-for="(course, index) in courses" :key="index">
          <the-course
            :course="course"
            :course-index="index"
            @updateStructure="$emit('updateStructure', $event)"
            @savePicture="$emit('savePicture', $event)"
            @removePicture="$emit('removePicture', $event)"
            @validation="$emit('validation', $event)"
          ></the-course>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </base-card>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import Vue, { PropType } from 'vue';
import { CourseStructureModel } from '../models/courseStructure';
import { voicebotGetters } from '../store';
import TheCourse from './TheCourse.vue';

export default Vue.extend({
  components: {
    TheCourse,
  },
  props: {
    courses: {
      type: Array as PropType<CourseStructureModel[]>,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      courseIndex: 0,
    };
  },
  computed: {
    ...mapGetters({
      course: voicebotGetters.getCourse,
    }),
  },
  methods: {
    addCourseIndex() {
      if (this.courseIndex === this.courses.length - 1) this.courseIndex = 0;
      else this.courseIndex += 1;
      this.$emit('courseIndex', this.courseIndex);
    },
    removeCourseIndex() {
      if (this.courseIndex === 0) this.courseIndex = this.courses.length - 1;
      else this.courseIndex -= 1;
      this.$emit('courseIndex', this.courseIndex);
    },
  },
});
</script>
