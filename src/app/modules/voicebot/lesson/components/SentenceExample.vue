<template>
  <v-col cols="12" class="offset-md-1">
    <base-card>
      <v-card-title class="pb-0">Przykład dla słowa: word</v-card-title>
      <v-btn class="ml-n16" color="primary" style="margin-top: 80px" absolute dark small fab d-inline>
        <v-icon>1</v-icon>
      </v-btn>
      <v-card-text>
        <v-form lazy-validation>
          <v-text-field :counter="10" label="Angielskie słówko po angielsku" required />
          <v-text-field :counter="10" label="Angielskie słówko po polsku" required />
          <v-avatar size="100" class="mr-5">
            <v-img src="@/assets/images/faces/15.jpg" />
          </v-avatar>
          <v-file-input
            show-size
            label="File input"
            flat
            style="width: 25%; display: inline-flex"
            class="d-inline-flex mr-5"
          ></v-file-input>
          <v-btn :disabled="false" color="success" class="mr-4"
            ><v-icon left> mdi-comment-plus-outline </v-icon> Dodaj przykład</v-btn
          >
          <v-btn :disabled="false" color="warning" class="mr-4">
            <v-icon left> mdi-comment-remove-outline </v-icon>Usuń przykład
          </v-btn>
        </v-form>
      </v-card-text>
    </base-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
