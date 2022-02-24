<template>
  <v-footer
    tile
    height="80"
    class="font-weight-medium shadow-sm ma-4 rounded-lg"
    :background="layoutState.backgroundColor"
    :color="layoutState.layoutMode"
    :dark="layoutState.isDarkMode"
    :inset="true"
    app
    absolute
  >
    <v-col class="text-left" cols="12">
      <div class="d-flex flex-row justify-space-between align-center">
        <div>
          <v-btn href="https://store.vuetifyjs.com/products/octavia-admin-pro" target="_blank" depressed color="warning"
            >Localvoice</v-btn
          >
        </div>
        <div>
          <app-version></app-version>
        </div>
      </div>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { layoutGetters } from '../store';
import AppVersion from '~app/shared/version/AppVersion.vue';

export default Vue.extend({
  components: {
    AppVersion,
  },
  computed: {
    ...mapGetters({
      layoutState: layoutGetters.getState,
    }),
  },
});
</script>

<style lang="scss"></style>
