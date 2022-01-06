<template>
  <v-app>
    <!-- <keep-alive> -->
    <layout-loader />
    <!-- </keep-alive> -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  computed: {
    ...mapGetters(['getThemeMode']),
  },
  // mounted() {
  //   if (this.$route.params.layout) {
  //     this.changeThemeLayout(this.$route.params.layout);
  //   }
  // },
  methods: {
    ...mapActions(['changeThemeLayout']),
  },
};
</script>
