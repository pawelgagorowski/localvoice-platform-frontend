<template>
  <v-col cols="12">
    <base-card>
      <v-card-title>
        <div class="d-flex justify-space-between flex-wrap">
          <v-btn class="ma-2" dark color="danger">
            <v-icon>mdi-plus</v-icon>
            Add Customer
          </v-btn>
        </div>
      </v-card-title>
      <v-card-title>Stwórz lekcję dla swoich podopiecznych</v-card-title>
      <v-card-text>
        <v-form lazy-validation>
          <v-select :items="courseNames" label="nazwa kursu" @change="changeCourseSelectField($event)" />
          <v-select
            :items="categoryNames"
            label="nazwa kategorii po polsku i angielsku"
            @change="changeCategorySelectField($event)"
          />
          <v-select
            :items="lessonNames"
            label="Nazwa lekcji po polsku i angielsku"
            @change="changeLessonSelectField($event)"
          />
          <v-textarea flat hint="Hint" label="Wstęp po angielsku" clearable />
          <v-textarea flat hint="Hint" label="Wstęp po polsku" clearable />
        </v-form>
      </v-card-text>
    </base-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { objectKeys } from '~app/shared';
import { voicebotGetters } from '~app/modules/voicebot/structure/store';

export default Vue.extend({
  data: () => ({
    selectedCourseName: '',
    categoryNames: [] as string[],
    selectedCategoryName: '',
    lessonNames: [] as string[],
    selectedLessonName: '',
  }),
  computed: {
    ...mapGetters({
      linkedCoursesCategoriesAndLessons: voicebotGetters.getLinkedCoursesCategoriesAndLessons,
    }),
    courseNames() {
      return objectKeys(this.linkedCoursesCategoriesAndLessons);
    },
  },
  methods: {
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
