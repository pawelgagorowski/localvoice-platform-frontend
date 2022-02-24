<template>
  <v-slide-group
    v-if="course.categories.length > 0"
    class="pa-4 mb-7"
    multiple
    show-arrows
    :style="{ background: backgroundForSlides }"
  >
    <template>
      <v-slide-item v-for="(category, categoryIndex) in course.categories" :key="categoryIndex" class="ml-0 mr-0">
        <the-category
          :category="category"
          :category-index="categoryIndex"
          :course-index="courseIndex"
          :is-max-categories="isMaxCategories"
          @removeCategory="$emit('removeCategory', $event)"
          @insertCategory="$emit('insertCategory', $event)"
          @updateStructure="$emit('updateStructure', $event)"
          @savePicture="$emit('savePicture', $event)"
          @removePicture="$emit('removePicture', $event)"
          @insertLesson="$emit('insertLesson', $event)"
          @addLesson="$emit('addLesson', $event)"
          @removeLesson="$emit('removeLesson', $event)"
          @validation="$emit('validation', $event)"
        ></the-category>
      </v-slide-item>
    </template>
  </v-slide-group>

  <v-row v-else align="center" class="noContent">
    <v-col cols="12" align="center">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mb-4 mr-4"
            color="primary"
            fab
            small
            v-on="on"
            @click.stop="$emit('addCategory', { courseIndex })"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Dodaj kategorię</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapGetters } from 'vuex';
import TheCategory from './TheCategory.vue';
import { layoutGetters } from '~app/layout/store';
import { LayoutMode } from '~app/layout/types';
import { CourseStructureModel } from '../models/courseStructure';

export default Vue.extend({
  metaInfo: {
    title: 'Structure',
  },
  name: 'VoicebotStructure',
  components: {
    TheCategory,
  },
  props: {
    course: {
      type: Object as PropType<CourseStructureModel>,
      required: true,
    },
    courseIndex: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
      loading: false,
      maxAmountOfCategories: 12,
    
  }),
  computed: {
    ...mapGetters({
      layoutState: layoutGetters.getState,
    }),
    isMaxCategories() {
      if(this.course.categories) return this.course.categories.length >= this.maxAmountOfCategories;
      else return false;
    },
    backgroundForSlides() {
      const backgroundColor = this.layoutState.layoutMode === LayoutMode.WHITE ? '#fff' : '#242939';
      return backgroundColor;
    },
  },
});
</script>

<style scope>
.course-counter {
  z-index: 1;
}

.localvoice-file-input {
  max-width: 50% !important;
}

.noContent {
  height: 200px;
}
</style>
