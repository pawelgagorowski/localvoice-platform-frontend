/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Vue from 'vue';

export const FormValidationMixin = Vue.extend({
  watch: {
    'form.data': {
      deep: true,
      handler() {
        this.$emit('validation', {
          data: this.form,
          courseIndex: this.courseIndex,
          id: this.validationId,
        });
      },
    },
  },
});
