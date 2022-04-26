/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
import Vue, { CreateElement, PropType, RenderContext, VNode } from 'vue';
import { ValidationError } from '../types';

export const FormControlState = Vue.extend({
  name: 'FormControlState',
  functional: true,

  props: {
    errors: { type: Array as PropType<ValidationError[]> },
    image: { type: String },
    custom: {
      type: Object as PropType<{ [key: string]: string }>,
      default: () => ({}),
    },
  },

  render(h: CreateElement, context: RenderContext): VNode | VNode[] {
    let error: ValidationError | undefined;
    let errors: ValidationError[];
    let blobFile: File | undefined;

    if (context.props.errors) {
      errors = context.props.errors;
      error = errors[0];
      if (context.props.custom[error.type]) {
        error.message = context.props.custom[error.type];
      }
    }

    if (context.props.image) {
      blobFile = new File([], context.props.image);
    }

    // if(context.props.image) {}
    return context.scopedSlots.default({
      // for bootstrap-vue form components
      state: error ? false : null,
      // for custom components, eg. v-select
      invalid: !!error,
      // translated error message
      message: error ? error.message : null,

      blobFile: blobFile || null,
    }) as VNode | VNode[];
  },
});
