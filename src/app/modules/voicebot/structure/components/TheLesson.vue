<template>
  <v-row>
    <v-col cols="2" class="myFlex">
      <v-btn color="primary" dark small fab d-inline class="course-counter">
        <v-icon>{{ lessonIndex + 1 }}</v-icon>
      </v-btn>
    </v-col>
    <v-col>
      <form-control-state v-slot:default="{ message }" :errors="form.errors.subject">
        <v-text-field
          :value="lesson.subject"
          :error-messages="message"
          clear-icon
          :label="$t('voicebot.labels.lessonName')"
          :placeholder="$t('voicebot.labels.lessonNamePlaceholder')"
          @input="
            $emit('updateStructure', {
              subject: $event,
              courseIndex,
              categoryIndex,
              lessonIndex,
              operation: 'lesson',
            })
          "
        />
      </form-control-state>
      <form-control-state v-slot:default="{ message }" :errors="form.errors.translatedSubject">
        <v-text-field
          :value="lesson.translatedSubject"
          :error-messages="message"
          :label="$t('voicebot.labels.translatedLessonName')"
          :placeholder="$t('voicebot.labels.translatedLessonNamePlaceholder')"
          class="mb-5"
          @input="
            $emit('updateStructure', {
              translatedSubject: $event,
              courseIndex,
              categoryIndex,
              lessonIndex,
              operation: 'lesson',
            })
          "
        />
      </form-control-state>
      <div class="d-flex">
        <v-img v-if="lesson.imageSrc" :src="lesson.imageSrc" width="10px" />
        <form-control-state
          v-slot:default="{ message, blobFile }"
          :image="lesson.imageSrc"
          :errors="form.errors.imageSrc"
        >
          <v-file-input
            v-if="lesson"
            :label="$t('voicebot.labels.lessonFileInput')"
            flat
            :value="blobFile"
            :error-messages="message"
            class="d-inline-flex localvoice-file-input"
            truncate-length="4"
            @change="updatePicture($event, lesson.imageSrc)"
          ></v-file-input>
        </form-control-state>
      </div>
      <div class="mt-4">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mb-4 mr-4"
              color="primary"
              fab
              small
              :disabled="maxLessons"
              v-on="on"
              @click.stop="
                $emit('insertLesson', {
                  courseIndex,
                  categoryIndex,
                  lessonIndex,
                })
              "
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Dodaj lekcję poniżej</span>
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
                $emit('removeLesson', {
                  courseIndex,
                  categoryIndex,
                  lessonIndex,
                  validationId,
                })
              "
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
          <span>Usuń lekcję</span>
        </v-tooltip>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FormGroup, FormControlState } from '~app/shared/form';
import { LessonStructureModel } from '../models';
import { createLessonForm } from '../validation/forms';
import { FormValidationMixin } from '../validation/formValidation.mixin';
import { ValidationTarget } from '~app/shared';

export default Vue.extend({
  name: 'TheLesson',
  components: {
    FormControlState,
  },
  mixins: [FormValidationMixin],
  props: {
    lesson: {
      type: Object as PropType<FormGroup<LessonStructureModel>>,
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
    lessonIndex: {
      type: Number,
      default: 0,
    },
    maxLessons: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    const form = createLessonForm();
    return {
      validationId: '',
      form,
    };
  },
  watch: {
    lesson: {
      immediate: true,
      handler(lesson) {
        this.form.data = lesson;
        this.validationId = `course-${this.courseIndex}-category-${this.categoryIndex}-course-${this.lessonIndex}`;
        this.$emit('validation', {
          data: this.form,
          courseIndex: this.courseIndex,
          id: this.validationId,
          targets: [ValidationTarget.TEST],
        });
      },
    },
    validationId: {
      handler(validationId) {
        this.$emit('lessonValidationId', validationId);
      },
      immediate: true,
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
        lessonIndex: this.lessonIndex,
        imageSrc,
        operation: 'lesson',
      });
    },
  },
});
</script>

<style scope>
.course-counter {
  z-index: 1;
}

.myFlex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.localvoice-file-input {
  max-width: 50% !important;
}
</style>
