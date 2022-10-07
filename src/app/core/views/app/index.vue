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
    LayoutLoader,
  },
  data() {
    return {
      layoutName: '',
    };
  },
  // mounted() {
  //   if (this.$route.params.layout) {
  //     this.changeThemeLayout(this.$route.params.layout);
  //   }
  // },
};
</script>
