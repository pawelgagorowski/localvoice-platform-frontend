<template>
  <base-card class="mr-5">
    <div class="mt-4">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mb-4 mr-4"
            color="primary"
            fab
            small
            :disabled="isMaxCategories"
            v-on="on"
            @click.stop="$emit('insertCategory', { courseIndex, categoryIndex })"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Dodaj kategorię zaraz po tej</span>
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
              $emit('removeCategory', {
                courseIndex,
                categoryIndex,
              })
            "
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
        <span>Usuń tą kategorię</span>
      </v-tooltip>
    </div>
    <v-card-title class="pb-0">Kategoria</v-card-title>
    <v-card-text>
      <v-form>
        <form-control-state v-slot:default="{ message }" :errors="form.errors.subject">
          <v-text-field
            :value="category.subject"
            :error-messages="message"
            hint="To musi być wyrażenie składające się z kilku słów"
            label="Wyrażenie do nauki 1"
            @input="
              $emit('updateStructure', {
                subject: $event,
                courseIndex,
                categoryIndex,
                operation: 'category',
              })
            "
          />
        </form-control-state>
        <form-control-state v-slot:default="{ message }" :errors="form.errors.translatedSubject">
          <v-text-field
            :value="category.translatedSubject"
            :error-messages="message"
            hint="To musi być wyrażenie składające się z kilku słów"
            label="opis"
            class="mb-5"
            @input="
              $emit('updateStructure', {
                translatedSubject: $event,
                courseIndex,
                categoryIndex,
                operation: 'category',
              })
            "
          />
        </form-control-state>
        <div class="d-flex">
          <v-img v-if="category.imageSrc" :src="category.imageSrc" width="10px" />
          <form-control-state
            v-slot:default="{ message, blobFile }"
            :image="category.imageSrc"
            :errors="form.errors.imageSrc"
          >
            <v-file-input
              label="File input"
              flat
              :value="blobFile"
              :error-messages="message"
              truncate-length="4"
              class="d-inline-flex localvoice-file-input"
              @change="updatePicture($event, category.imageSrc)"
            ></v-file-input>
          </form-control-state>
        </div>
        <v-btn
          :disabled="maxLessons"
          color="success"
          class="mr-4 mb-5 mt-4 course-counter"
          @click.stop="
            $emit('addLesson', {
              courseIndex,
              categoryIndex,
            })
          "
        >
          Dodaj lekcje
        </v-btn>

        <v-card-title class="pb-0">Lekcje</v-card-title>
        <template>
          <div
            v-for="(lesson, lessonIndex) in category.list"
            :key="lessonIndex"
            style="margin-bottom: 55px, position: relative"
          >
            <the-lesson
              :course-index="courseIndex"
              :category-index="categoryIndex"
              :lesson-index="lessonIndex"
              :lesson="lesson"
              :max-lessons="maxLessons"
              @updateStructure="$emit('updateStructure', $event)"
              @savePicture="$emit('savePicture', $event)"
              @removePicture="$emit('removePicture', $event)"
              @insertLesson="$emit('insertLesson', $event)"
              @removeLesson="$emit('removeLesson', $event)"
              @validation="$emit('validation', $event)"
            ></the-lesson>
          </div>
        </template>
      </v-form>
    </v-card-text>
  </base-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { v4 as uuid } from 'uuid';
import { FormControlState } from '~app/shared/form';
import TheLesson from './TheLesson.vue';
import { CategoryStructureModel } from '../models/categoryStructure';
import { createCategoryForm } from '../validation/forms';
import { FormValidationMixin } from '../validation/formValidation.mixin';

export default Vue.extend({
  components: {
    TheLesson,
    FormControlState,
  },
  mixins: [FormValidationMixin],
  props: {
    category: {
      type: Object as PropType<CategoryStructureModel>,
      required: true,
    },
    courseIndex: {
      type: Number,
      default: 0,
    },
    categoryIndex: {
      type: Number,
      default: 0,
    },
    isMaxCategories: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
      const form = createCategoryForm()
      return {
        maxAmountOfLessons: 12,
        form,
        validationId: '',
    };
  },
  computed: {
    maxLessons() {
      if (this.category.list) return this.category.list.length >= this.maxAmountOfLessons;
      return false;
    },
  },
  watch: {
    category: {
      immediate: true,
      handler(category) {
        this.form.data = category;
        this.validationId = uuid();
        this.$emit('validation', {
          data: this.form,
          courseIndex: this.courseIndex,
          id: this.validationId,
        });
      },
    },
  },
  methods: {
    updatePicture($event: File | null = null, imageSrc: string) {
      console.log('removePicture');
      let emitterName: string;
      if ($event && $event.name.startsWith('https')) return;
      if (!$event) emitterName = 'removePicture';
      else emitterName = 'savePicture';

      this.$emit(emitterName, {
        file: $event,
        courseIndex: this.courseIndex,
        categoryIndex: this.categoryIndex,
        operation: 'category',
        imageSrc,
      });
    },
  },
});
</script>
