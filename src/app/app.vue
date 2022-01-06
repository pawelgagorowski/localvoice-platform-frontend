<template>
  <router-view />
</template>

<script>
import '~app/shared/components';

export default {
  name: 'App',
  metaInfo() {
    return {
      title: 'Learn Your People',
      titleTemplate: '%s | Localvoice',
    };
  },
};
</script>

<style>
.container {
  max-width: 1385px !important;
}
</style>
