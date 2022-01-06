/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import { DirectiveOptions } from 'vue';
import { loadingService } from './loading.service';
import { SysLoadingNamespace } from './types';

let LOADING_NEXT_ID = 0;

type LoadingElement = HTMLElement & {
  instance: SysLoadingNamespace;
};

export const SysLoading: DirectiveOptions = {
  bind(el: LoadingElement, binding) {
    const name = binding.arg || `sys-loading-${(LOADING_NEXT_ID += 1)}`;
    el.instance = loadingService.create({
      name,
      target: el,
    });

    if (binding.value) {
      el.instance.register();
    }
  },
  update(el: LoadingElement, binding) {
    if (binding.oldValue !== binding.value) {
      binding.value ? el.instance.register() : el.instance.resolve();
    }
  },
  unbind(el: LoadingElement) {
    el.instance.remove();
  },
};
