<template>
  <v-col cols="10" class="offset-md-1">
    <base-card>
      <v-card-title class="pb-0">Słowo/wyrażenie</v-card-title>
      <v-btn class="ml-n16 mt-10" color="primary" absolute dark small fab d-inline>
        <v-icon>1</v-icon>
      </v-btn>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            :counter="50"
            hint="To musi być wyrażenie składające się z kilku słów"
            label="Wyrażenie do nauki"
            required
          />
          <v-btn :disabled="false" color="success" class="mr-4" @click="addSentenceExample()"> Dodaj przykład </v-btn>
          <v-btn :disabled="false" color="danger" dark class="mr-4" @click="removeSentenceExample()">
            Usuń słowo/wyrażenie
          </v-btn>
        </v-form>
      </v-card-text>
    </base-card>
    <div v-for="(sentenceExample, sentenceExampleIndex) in sentenceExamples" :key="sentenceExampleIndex">
      <sentence-example :sentence-example="sentenceExample"></sentence-example>
    </div>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import SentenceExample from './SentenceExample.vue';

export default Vue.extend({
  components: {
    SentenceExample,
  },
  data() {
    return {
      sentenceExamples: [],
    };
  },
  methods: {
    addSentenceExample() {
      this.sentenceExamples.push();
    },
    removeSentenceExample() {
      console.log('removeSentenceExample');
      this.sentenceExamples.pop();
    },
  },
});
</script>
