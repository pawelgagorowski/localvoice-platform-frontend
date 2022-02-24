import { PluginObject } from 'vue/types/umd';
import AppVersion from './AppVersion.vue';

export const AppVersionPlugin: PluginObject<void> = {
  install(Vue) {
    console.log('hello from AppVersionPlugin');
    Vue.component(AppVersion.name, AppVersion);
  },
  component: AppVersion,
};
