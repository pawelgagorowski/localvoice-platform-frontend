<template>
  <v-app>
    <!-- <keep-alive> -->
    <vertical-white-sidebar />
    <!-- </keep-alive> -->

    <!-- <customizer /> -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
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
