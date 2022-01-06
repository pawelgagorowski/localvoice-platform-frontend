/* eslint-disable import/no-cycle */
import { PluginFunction } from 'vue';
import { api } from './client';

export const ApiPlugin: PluginFunction<void> = (Vue) => {
  Object.defineProperty(Vue.prototype, '$api', {
    get() {
      return api;
    },
  });
};
