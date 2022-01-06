<template>
  <transition name="fade" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
    <div v-show="visible" class="sys-loading" :class="{ 'is-fullscreen': fullscreen }">
      <sys-spinner :diameter="spinnerDiameter" />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { SPINNER_BASE_SIZE, SysSpinnerPlugin } from '../spinner';

export default Vue.extend({
  components: {
    SysSpinner: SysSpinnerPlugin.component,
  },
  props: {
    visible: { type: Boolean, default: false },
    spinnerDiameter: { type: Number, default: SPINNER_BASE_SIZE },
    fullscreen: { type: Boolean, default: true },
  },
  methods: {
    onAfterEnter() {
      this.$emit('after-enter');
    },
    onAfterLeave() {
      this.$emit('after-leave');
    },
  },
});
</script>

<style lang="scss">
@import 'loading';
</style>
