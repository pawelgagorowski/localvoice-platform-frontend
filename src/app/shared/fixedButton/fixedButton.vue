<template>
  <div>
    <v-speed-dial
      v-if="isFixedButton"
      v-model="fab"
      bottom
      right
      direction="left"
      fixed
      class="fixed-save-bottom-button-localvoice"
    >
      <template v-slot:activator>
        <v-btn color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-btn v-if="buttonsText.save" dark color="green" @click="saveFn()">
        <v-icon>mdi-plus</v-icon>
        {{ buttonsText.save }}
      </v-btn>
      <v-btn v-if="buttonsText.test" dark color="indigo" @click="testFn()">
        <v-icon>mdi-plus</v-icon>
        {{ buttonsText.test }}
      </v-btn>
      <v-btn v-if="buttonsText.production" dark color="red" @click="prodFn()">
        {{ buttonsText.production }}
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-speed-dial>
    <div v-else class="d-flex justify-start flex-wrap">
      <v-btn v-if="buttonsText.save" class="ma-2" dark color="danger" @click="saveFn()">
        <v-icon>mdi-plus</v-icon>
        {{ buttonsText.save }}
      </v-btn>
      <div>
        <v-btn v-if="buttonsText.test" class="ma-2" color="primary" @click="testFn()">
          <v-icon>mdi-plus</v-icon> {{ buttonsText.test }}
        </v-btn>
      </div>
      <div>
        <v-btn v-if="buttonsText.production" class="ma-2" color="success" @click="prodFn()">
          <v-icon>mdi-plus</v-icon> {{ buttonsText.production }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { VoicebotButtonsText } from '../types';

export default Vue.extend({
  name: 'FixedButton',
  props: {
    saveFn: {
      type: Function,
      default: () => '',
    },
    testFn: {
      type: Function,
      default: () => '',
    },
    prodFn: {
      type: Function,
      default: () => '',
    },
    buttonsText: {
      type: Object as PropType<VoicebotButtonsText>,
      default: () => ({
        save: '',
        test: '',
        production: '',
      }),
    },
    isFixedButton: {
      type: Boolean,
      default: () => true,
    },
  },
  data: () => ({
    fab: false,
  }),
});
</script>
