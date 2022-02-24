<template>
  <div class="myClass">
    <v-snackbar v-model="toast" color="dark" :timeout="timeout">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="toast = false"> Zamknij </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      toast: true,
      timeout: 10000,
    };
  },
});
</script>

<style>
.myClass {
  z-index: 1000000000;
}
</style>
