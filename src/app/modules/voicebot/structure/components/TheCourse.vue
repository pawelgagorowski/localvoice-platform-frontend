<template>
  <div class="d-flex justify-start pl-5">
    <div style="min-width: 23%">
      <form-control-state v-slot:default="{ message }" :errors="form.errors.subject">
        <v-text-field
          :value="course.subject"
          :error-messages="message"
          :label="$t('labels.orginalCourseName')"
          :hint="$t('labels.orginalCourseNameHint')"
          :placeholder="$t('labels.orginalCourseNamePlaceholder')"
          @input="
            $emit('updateStructure', {
              subject: $event,
              courseIndex,
              operation: 'course'
            })
          "
        ></v-text-field>
      </form-control-state>
      <form-control-state v-slot:default="{ message }" :errors="form.errors.translatedSubject">
        <v-text-field
          :value="course.translatedSubject"
          :error-messages="message"
          :hint="$t('labels.translatedCourseHint')"
          :label="$t('labels.translatedCourseName')"
          :placeholder="$t('labels.translatedCourseNamePlaceholder')"
          @input="
            $emit('updateStructure', {
              translatedSubject: $event,
              courseIndex,
              operation: 'course'
            })
          "
        ></v-text-field>
      </form-control-state>
    </div>

    <div class="ml-15">
      <v-img :src="course.imageSrc" width="120px" />
    </div>
    <div class="ml-15" style="min-width: 15%">
      <form-control-state
        v-slot:default="{ message, blobFile }"
        :image="course.imageSrc"
        :errors="form.errors.imageSrc"
      >
        <v-file-input
          :label="$t('labels.courseFileInput')"
          :value="blobFile"
          :error-messages="message"
          @change="updatePicture($event, course.imageSrc)"
        ></v-file-input>
      </form-control-state>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FormControlState } from '~app/shared/form';
import { ValidationTarget } from '~app/shared/types';
import { CourseStructureModel } from '../models/courseStructure';
import { createCourseForm, createNumberOfCategoriesForm } from '../validation/forms';
import { FormValidationMixin } from '../validation/formValidation.mixin';

export default Vue.extend({
  components: {
    FormControlState
  },
  mixins: [FormValidationMixin],
  props: {
    course: {
      type: Object as PropType<CourseStructureModel>,
      required: true
    },
    courseIndex: {
      type: Number,
      required: true
    },
    numberOfCategories: {
      type: Number,
      required: true
    }
  },
  data: () => {
    const form = createCourseForm();
    const numberOfCategoriesForm = createNumberOfCategoriesForm();
    return {
      form,
      numberOfCategoriesForm,
      validationId: '',
      numberOfCategoriesValidationId: 'numberOfCategories'
    };
  },
  watch: {
    course: {
      immediate: true,
      handler(course) {
        this.form.data = course;
        this.validationId = `course-${this.courseIndex}`;
        this.$emit('validation', {
          data: this.form,
          courseIndex: this.courseIndex,
          id: this.validationId,
          targets: [ValidationTarget.TEST]
        });
      }
    },
    numberOfCategories: {
      immediate: true,
      handler(numberOfCategories: number) {
        this.numberOfCategoriesForm.data = { numberOfCategories };
        this.$emit('validation', {
          data: this.numberOfCategoriesForm,
          courseIndex: this.courseIndex,
          id: this.numberOfCategoriesValidationId,
          targets: [ValidationTarget.TEST]
        });
      }
    }
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
        operation: 'course',
        imageSrc
      });
    }
  }
});
</script>
