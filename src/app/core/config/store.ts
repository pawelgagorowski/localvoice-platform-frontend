import axios from 'axios';
import { Module } from 'vuex';
import { RootState } from '~app/core/store';
// import { CompanyConfig } from '~app/modules/auth';
import { coerceArray } from '~app/shared';
import {
  createActionFactory,
  createActionMap,
  createGetterFactory,
  createGetterMap,
  createMutationFactory,
  createMutationMap,
} from '~app/shared/vuex';
import { PUBLIC_PATH } from '../env';
import { Config, FeatureName, Features } from './types';

export const NAMESPACE = 'config';

let configRequest: Promise<void>;

const createAction = createActionFactory<Config, RootState>();
const actions = {
  loadConfig: createAction(({ commit }) => {
    console.log('config action - fetch');
    if (!configRequest) {
      configRequest = axios
        // fetch current environment configuration
        .get<Config>(`${PUBLIC_PATH}config/app.json`)
        // fallback to default configuration
        .catch(() => axios.get<Config>(`${PUBLIC_PATH}config/app.default.json`))
        .then((res) => commit(configMutations.setConfig.local, res.data));
    }
    return configRequest;
  }),
};

const createMutation = createMutationFactory<Config>();
const mutations = {
  setConfig: createMutation((state, config: Partial<Config>) => {
    Object.assign(state, config);
  }),
  setCompany: createMutation((state, config: any) => {
    const update: Partial<Config> = {
      companyLogo: config.logoFile,
      iframeHost: state.overrideIframeHost ? state.legacyWebServer : config.webServer,
    };

    if (!state.ignoreCompanyApiUrl) {
      update.apiUrl = `//${config.apiServer}`;
    }

    Object.assign(state, update);
  }),
};

const createGetter = createGetterFactory<Config, RootState>();
const getters = {
  getState: createGetter((state) => state),
  getApiUrl: createGetter((state) => state.apiUrl),
  hasFeature: createGetter((state) => (feature: FeatureName | FeatureName[]): boolean => {
    const arrayOfFeatures = coerceArray(feature);
    const features: Partial<Features> = state.features || {};
    return arrayOfFeatures.length ? arrayOfFeatures.every((current) => features[current]) : false;
  }),
};

export const configStore: Module<Config, RootState> = {
  namespaced: true,
  actions,
  mutations,
  getters,
};

export const configActions = createActionMap<typeof actions, Config, RootState>(NAMESPACE, actions);
export const configMutations = createMutationMap<typeof mutations, Config>(NAMESPACE, mutations);
export const configGetters = createGetterMap<typeof getters, Config, RootState>(NAMESPACE, getters);
