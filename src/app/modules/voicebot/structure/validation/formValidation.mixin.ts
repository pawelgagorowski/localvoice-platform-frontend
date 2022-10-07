/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Vue from 'vue';
import { ValidationTarget } from '~app/shared';

export const FormValidationMixin = Vue.extend({
  watch: {
    'form.data': {
      deep: true,
      handler() {
        this.$emit('validation', {
          data: this.form,
          courseIndex: this.courseIndex,
          id: this.validationId,
          targets: [ValidationTarget.TEST],
        });
      },
    },
  },
});
