import { PluginObject } from 'vue';
import SysSpinner from './spinner.vue';

export * from './types';

export const SysSpinnerPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.component(SysSpinner.name, SysSpinner);
  },
  component: SysSpinner,
};
