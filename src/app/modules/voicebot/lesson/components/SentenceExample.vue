<template>
  <v-col cols="12" class="offset-md-1">
    <base-card>
      <v-card-title class="pb-0">{{ $t('voicebot.labels.exampleForSentence', { sentence }) }}</v-card-title>
      <v-btn class="ml-n16" color="primary" style="margin-top: 80px" absolute dark small fab d-inline>
        <v-icon>{{ index }}</v-icon>
      </v-btn>
      <v-card-text>
        <form-control-state v-slot:default="{ message }" :errors="form.errors.example">
          <v-text-field
            :hint="$t('voicebot.labels.hintForSentenceExample')"
            :label="$t('voicebot.labels.sentenceExample')"
            :placeholder="$t('voicebot.labels.sentenceExamplePlaceholder')"
            :value="sentenceExample.example"
            :error-messages="message"
            @input="
              $emit('updateSentenceExample', {
                sentenceIndex,
                sentenceExampleIndex,
                sentenceExampleStructure: {
                  example: $event,
                },
              })
            "
          />
        </form-control-state>
        <form-control-state v-slot:default="{ message }" :errors="form.errors.translatedExample">
          <v-text-field
            :label="$t('voicebot.labels.translatedSentenceExample')"
            :placeholder="$t('voicebot.labels.translatedSentenceExamplePlaceholder')"
            :value="sentenceExample.translatedExample"
            :error-messages="message"
            @input="
              $emit('updateSentenceExample', {
                sentenceIndex,
                sentenceExampleIndex,
                sentenceExampleStructure: {
                  translatedExample: $event,
                },
              })
            "
          />
        </form-control-state>
        <div class="d-flex">
          <v-img
            v-if="sentenceExample.imageSrc"
            :src="sentenceExample.imageSrc"
            class="create-lesson-image-localvoice"
          />
          <form-control-state
            v-slot:default="{ message, blobFile }"
            :image="sentenceExample.imageSrc"
            :errors="form.errors.imageSrc"
          >
            <v-file-input
              v-if="sentenceExample"
              :label="$t('voicebot.labels.fileInput')"
              flat
              :value="blobFile"
              :error-messages="message"
              class="d-inline-flex localvoice-file-input"
              truncate-length="4"
              @change="updatePicture($event, sentenceExample.imageSrc)"
            ></v-file-input>
          </form-control-state>
        </div>
        <v-btn
          :disabled="false"
          color="success"
          class="mr-4"
          @click="
            $emit('insertSentenceExample', {
              sentenceIndex,
              sentenceExampleIndex,
            })
          "
          ><v-icon left> mdi-comment-plus-outline </v-icon>{{ $t('voicebot.buttons.addAnotherSentenceExample') }}</v-btn
        >
        <v-btn
          :disabled="false"
          color="warning"
          class="mr-4"
          @click="
            $emit('removeSentenceExample', {
              sentenceIndex,
              sentenceExampleIndex,
              validationId,
            })
          "
        >
          <v-icon left> mdi-comment-remove-outline </v-icon>{{ $t('voicebot.buttons.removeSentenceExample') }}
        </v-btn>
      </v-card-text>
    </base-card>
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FormControlState } from '~app/shared/form';
import SentenceExampleExercisesModel from '../models/sentenceExampleExerciseModel';
import { createSentenceExampleForm } from '../validation/forms';
import { ValidationTarget } from '~app/shared';

export default Vue.extend({
  components: {
    FormControlState,
  },
  props: {
    sentenceExample: {
      type: Object as PropType<SentenceExampleExercisesModel>,
      default: {
        example: '',
        translatedExample: '',
        imageSrc: '',
      },
    },
    sentenceExampleIndex: {
      type: Number,
      default: 0,
    },
    sentenceIndex: {
      type: Number,
      default: 0,
    },
    sentence: {
      type: String,
      default: '',
    },
  },
  data: () => {
    const form = createSentenceExampleForm();
    return {
      example: '',
      transaltedExample: '',
      validationId: '',
      index: 0,
      form,
    };
  },
  watch: {
    sentenceExampleIndex: {
      handler(sentenceExampleIndex) {
        this.index = sentenceExampleIndex + 1;
      },
      immediate: true,
    },
    sentenceExample: {
      handler(sentenceExample) {
        console.log('sentenceExample watcher');
        this.validationId = `sentence-${this.sentenceIndex}-sentenceExample-${this.sentenceExampleIndex}`;
        this.form.data = sentenceExample;
        this.$emit('validation', {
          data: this.form,
          id: this.validationId,
          targets: [ValidationTarget.TEST],
        });
      },
      immediate: true,
      deep: true,
    },
    validationId: {
      handler(validationId) {
        this.$emit('sentenceExampleValidationId', validationId);
      },
      immediate: true,
    },
  },
  methods: {
    updatePicture($event: File | null = null, imageSrc: string) {
      console.log('updatePicture event', $event);
      console.log('imageSrc', imageSrc);
      let emitterName: string;
      if ($event && $event.name.startsWith('https')) return;
      if (!$event) emitterName = 'removePicture';
      else emitterName = 'savePicture';

      this.$emit(emitterName, {
        file: $event,
        sentenceIndex: this.sentenceIndex,
        sentenceExampleIndex: this.sentenceExampleIndex,
        sentenceExampleStructure: {
          imageSrc,
        },
      });
    },
  },
});
</script>
