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
  bind(element, binding) {
    const name = binding.arg || `sys-loading-${(LOADING_NEXT_ID += 1)}`;
    // const myEl: any = el;
    const bindingElement: any = element;
    bindingElement.instance = loadingService.create({
      name,
      target: element,
    });

    if (binding.value) {
      bindingElement.instance.register();
    }
  },
  update(element, binding) {
    const bindingElement: any = element;
    if (binding.oldValue !== binding.value) {
      binding.value ? bindingElement.instance.register() : bindingElement.instance.resolve();
    }
  },
  unbind(element) {
    const bindingElement: any = element;
    bindingElement.instance.remove();
  },
};
