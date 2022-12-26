<template>
  <v-col cols="10" class="offset-md-1">
    <base-card>
      <v-card-title class="pb-0">{{ $t('labels.sentenceTitle') }}</v-card-title>
      <v-btn class="ml-n16 mt-10" color="primary" absolute dark small fab d-inline>
        <v-icon>{{ index }}</v-icon>
      </v-btn>
      <v-card-text>
        <form-control-state v-slot:default="{ message }" :errors="form.errors.sentence">
          <v-text-field
            :counter="50"
            :error-messages="message"
            :label="$t('labels.sentenceToLearn')"
            :placeholder="$t('labels.sentencePlaceholder')"
            :value="sentenceExercise.sentence"
            @input="
              $emit('updateSentence', {
                sentence: $event,
                sentenceIndex
              })
            "
          />
        </form-control-state>
        <v-btn :disabled="false" color="success" class="mr-4" @click="$emit('addSentenceExample', sentenceIndex)">
          {{ $t('buttons.addSentenceExample') }}
        </v-btn>
        <v-btn :disabled="false" color="primary" class="mr-4" @click="$emit('insertSentence', sentenceIndex)">
          {{ $t('buttons.addExample') }}
        </v-btn>
        <v-btn
          :disabled="false"
          color="danger"
          dark
          class="mr-4"
          @click="
            $emit('removeSentence', {
              sentenceIndex,
              validationIds: [...sentenceExampleValidationIds, validationId]
            })
          "
        >
          Usuń słowo/wyrażenie
        </v-btn>
      </v-card-text>
    </base-card>
    <div
      v-for="(sentenceExample, sentenceExampleIndex) in sentenceExercise.sentenceExample"
      :key="sentenceExampleIndex"
    >
      <sentence-example
        :sentence="sentenceExercise.sentence"
        :sentence-index="sentenceIndex"
        :sentence-example="sentenceExample"
        :sentence-example-index="sentenceExampleIndex"
        @updateSentenceExample="$emit('updateSentenceExample', $event)"
        @insertSentenceExample="$emit('insertSentenceExample', $event)"
        @removeSentenceExample="$emit('removeSentenceExample', $event)"
        @savePicture="$emit('savePicture', $event)"
        @removePicture="$emit('removePicture', $event)"
        @validation="$emit('validation', $event)"
        @sentenceExampleValidationId="setSentenceExampleValidationIds"
      ></sentence-example>
    </div>
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FormControlState } from '~app/shared/form';
import { ValidationTarget } from '~app/shared';
import SentenceExample from './SentenceExample.vue';
import SentenceExercisesModel from '../models/sentenceExerciseModel';
import { createSentenceForm } from '../validation/forms';

export default Vue.extend({
  components: {
    SentenceExample,
    FormControlState
  },
  props: {
    sentenceExercise: {
      type: Object as PropType<SentenceExercisesModel>,
      default: {
        sentence: '',
        sentenceExample: []
      }
    },
    sentenceIndex: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    const form = createSentenceForm();
    return {
      index: 0,
      validationId: '',
      sentenceExampleValidationIds: [] as string[],
      form
    };
  },
  watch: {
    sentenceIndex: {
      handler(sentenceIndex) {
        this.index = sentenceIndex + 1;
      },
      immediate: true
    },
    sentenceExercise: {
      handler(sentenceExercise) {
        console.log('sentenceExercise', sentenceExercise);
        this.validationId = `sentence-${this.sentenceIndex}`;
        this.form.data = sentenceExercise;
        this.$emit('validation', {
          data: this.form,
          id: this.validationId,
          targets: [ValidationTarget.TEST]
        });
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    setSentenceExampleValidationIds(validationId: string) {
      this.sentenceExampleValidationIds.push(validationId);
    }
  }
});
</script>
