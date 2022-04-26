import { PluginObject } from 'vue';
import FixedButton from './fixedButton.vue';

export const FixedButtonPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.component(FixedButton.name, FixedButton);
  },
};
