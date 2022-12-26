<template>
  <v-app>
    <!-- <keep-alive> -->
    <layout-loader />
    <!-- </keep-alive> -->
  </v-app>
</template>

<script>
import { LayoutLoader } from '@/app/layout';

export default {
  components: {
    LayoutLoader
  }
};
</script>
