/* eslint-disable no-shadow */
import { Module } from 'vuex';
import { Config } from '~app/core/config';
import { configGetters } from '~app/core/config/store';
import { RootState } from '~app/core/store';
import { createEntityAdapter, Dictionary, EntityState } from '~app/shared/vuex';
import { indexByName } from '../model/apps';
import { appsApi } from '../service/apps.api';
import { AppModel, RegisteredApp } from '../types';

export const APPS_STORE_NAMESPACE = 'apps';
export type AppsState = EntityState<AppModel>;

export enum AppStoreAction {
  LOAD = 'load',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ACTIVATE = 'activate',
}

export enum AppStoreMutation {
  ADD_ALL = 'addAll',
  UPSERT_ONE = 'addOne',
  REMOVE_ONE = 'removeOne',
}

export enum AppStoreGetter {
  BY_NAME = 'BY_NAME',
}

export const entityAdapter = createEntityAdapter<AppModel>();

export const getInitialState = () => entityAdapter.getInitialState();

const entityGetters = entityAdapter.createGetters();

export const appStore: Module<AppsState, RootState> = {
  namespaced: true,
  state: getInitialState,
  actions: {
    [AppStoreAction.LOAD]: ({ commit }) => appsApi.getApps().then((res) => commit(AppStoreMutation.ADD_ALL, res)),

    [AppStoreAction.CONNECT]: ({ dispatch, commit }, app: AppModel) => {
      const create = () => appsApi.createApp(app.name).then((res) => commit(AppStoreMutation.UPSERT_ONE, res));

      if (app.id) {
        return dispatch(AppStoreAction.DISCONNECT, app).then(create);
      }

      return create();
    },

    [AppStoreAction.DISCONNECT]: ({ commit, state }, { appId }: { appId: string }) => {
      const app = entityGetters.getAll(state).find((it) => it.appId === appId);
      if (!app) {
        return Promise.reject(new Error(`Unknown appId ${appId}`));
      }
      return appsApi.deleteApp(app.id).then(() => commit(AppStoreMutation.REMOVE_ONE, app.id));
    },

    [AppStoreAction.ACTIVATE]: (
      { commit, state, rootGetters },
      { appId, webhook }: { appId: string; webhook: string }
    ) => {
      let app = entityGetters.getAll(state).find((it) => it.appId === appId);
      if (!app) {
        return Promise.reject(new Error(`Unknown appId ${appId}`));
      }

      const config: Config = rootGetters[configGetters.getState];
      const appHost = config.apps[app.name as RegisteredApp];
      if (!appHost) {
        return Promise.reject(new Error(`App host not configured ${app.name}`));
      }

      app = { ...app, url: `${appHost}${webhook}`, isActive: true };

      return appsApi.updateApp(app.id, app).then((res) => commit(AppStoreMutation.UPSERT_ONE, res));
    },
  },
  mutations: {
    [AppStoreMutation.ADD_ALL]: (state, payload) => entityAdapter.addAll(payload, state),
    [AppStoreMutation.UPSERT_ONE]: (state, payload) => entityAdapter.upsertOne(payload, state),
    [AppStoreMutation.REMOVE_ONE]: (state, payload) => entityAdapter.removeOne(payload, state),
  },
  getters: {
    [AppStoreGetter.BY_NAME]: (state, getters, rootState, rootGetters) => {
      const appNames = Object.values(RegisteredApp);
      const config: Config = rootGetters[configGetters.getState];
      const appsByName = indexByName(entityGetters.getAll(state));

      return appNames.reduce<Dictionary<AppModel>>((acc, name) => {
        if (!config.apps || !config.apps[name]) {
          return acc;
        }

        let app = appsByName[name];
        if (!app) {
          app = new AppModel();
          app.name = name;
        }
        app.connectUrl = `${config.apps[name]}/connect?from=concretego`;
        app.disconnectUrl = `${config.apps[name]}/disconnect?from=concretego`;

        acc[name] = app;

        return acc;
      }, {});
    },
  },
};
