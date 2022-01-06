import Vue, { CreateElement, PropType, RenderContext, VNode } from 'vue';
import { ValidationError } from './validators';

export const FormControlState = Vue.extend({
  name: 'FormControlState',
  functional: true,

  props: {
    errors: { type: Array as PropType<ValidationError[]> },
    custom: {
      type: Object as PropType<{ [key: string]: string }>,
      default: () => ({}),
    },
  },

  render(h: CreateElement, context: RenderContext): VNode | VNode[] {
    let error: ValidationError;
    if (context.props.errors) {
      // eslint-disable-next-line prefer-destructuring
      error = context.props.errors[0];
      if (context.props.custom[error.type]) {
        error.message = context.props.custom[error.type];
      }
    }
    return context.scopedSlots.default({
      // for bootstrap-vue form components
      state: error ? false : null,
      // for custom components, eg. v-select
      invalid: !!error,
      // translated error message
      message: error ? context.parent.$t(error.message, error.args) : null,
    });
  },
});
