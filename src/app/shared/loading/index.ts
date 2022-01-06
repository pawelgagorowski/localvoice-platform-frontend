/* eslint-disable no-param-reassign */
import { PluginObject } from 'vue';
import { SysLoading } from './loading.directive';
import { loadingService } from './loading.service';

export const SysLoadingPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.directive('sys-loading', SysLoading);
    Vue.prototype.$loading = loadingService;
  },
  directive: SysLoading,
  service: loadingService,
};

export * from './types';
export { loadingService };
