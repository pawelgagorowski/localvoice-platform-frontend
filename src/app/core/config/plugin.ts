/* eslint-disable import/no-cycle */
import { PluginObject } from 'vue';
import { Store } from 'vuex';
import { api } from '~app/core/api';
import { FeatureDirective } from './features';
import { configActions, configGetters, configStore, NAMESPACE } from './store';
import { Config } from './types';

export interface AppConfigPluginOptions {
  store: Store<any>;
}

type AppConfigPlugin = PluginObject<void> & {
  init(): Promise<Config>;
};

export const ConfigPluginFactory = ({ store }: AppConfigPluginOptions): AppConfigPlugin => ({
  install(Vue) {
    store.registerModule(NAMESPACE, configStore);
    store.watch(
      (state, getters) => getters[configGetters.getApiUrl],
      (apiUrl) => {
        if (apiUrl) {
          api.defaults.baseURL = apiUrl;
        }
      }
    );

    Object.defineProperty(Vue.prototype, '$config', {
      get() {
        return store.getters[configGetters.getState];
      }
    });

    Vue.directive('feature', FeatureDirective);
  },

  async init() {
    return store.dispatch(configActions.loadConfig).then(() => store.getters[configGetters.getState]);
  }
});
