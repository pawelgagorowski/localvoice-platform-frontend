<template>
  <v-app
    :style="{
      background: layoutState.backgroundColor,
    }"
    :class="{
      'app-admin-wrap-layout-1 sidebar-mini': false,
      'sidebar-close': !true,
    }"
  >
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <data-container />
    <the-footer></the-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { layoutGetters } from './store';

export default {
  components: {
    DataContainer: () => import('./components/DataContainer.vue'),
    TheSidebar: () => import('./components/TheSidebar.vue'),
    TheFooter: () => import('./components/TheFooter.vue'),
    TheHeader: () => import('./components/TheHeader.vue'),
  },
  computed: {
    ...mapGetters({
      layoutState: layoutGetters.getState,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
