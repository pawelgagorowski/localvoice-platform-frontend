import { PluginObject } from 'vue/types/umd';
import AppVersion from './AppVersion.vue';

export const AppVersionPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.component(AppVersion.name, AppVersion);
  },
};
