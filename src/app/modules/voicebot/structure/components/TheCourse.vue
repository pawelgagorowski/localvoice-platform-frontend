<template>
  <div class="d-flex justify-start pl-5">
    <div style="min-width: 23%">
      <form-control-state v-slot:default="{ message }" :errors="form.errors.subject">
        <v-text-field
          :value="course.subject"
          :error-messages="message"
          label="Nazwa kursu w języku jakiego dotyczy kurs"
          hint="Do nazwy kursu należy dodać słow 'Course'"
          @input="
            $emit('updateStructure', {
              subject: $event,
              courseIndex,
              operation: 'course',
            })
          "
        ></v-text-field>
      </form-control-state>
      <form-control-state v-slot:default="{ message }" :errors="form.errors.translatedSubject">
        <v-text-field
          :value="course.translatedSubject"
          :error-messages="message"
          hint="To musi być wyrażenie składające się z kilku słów"
          label="Nazwa kursu w języku ojczystym"
          @input="
            $emit('updateStructure', {
              translatedSubject: $event,
              courseIndex,
              operation: 'course',
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
          label="Dodaj zdjęcie"
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
import { v4 as uuid } from 'uuid';
import { FormControlState } from '~app/shared/form';
import { CourseStructureModel } from '../models/courseStructure';
import { createCourseForm } from '../validation/forms';
import { FormValidationMixin } from '../validation/formValidation.mixin';

export default Vue.extend({
  components: {
    FormControlState,
  },
  mixins: [FormValidationMixin],
  props: {
    course: {
      type: Object as PropType<CourseStructureModel>,
      required: true,
    },
    courseIndex: {
      type: Number,
      required: true,
    },
  },
  data: () => {
    const form = createCourseForm();
    return {
      form,
      validationId: '',
    };
  },
  watch: {
    course: {
      immediate: true,
      handler(course) {
        this.form.data = course;
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
        operation: 'course',
        imageSrc,
      });
    },
  },
});
</script>
