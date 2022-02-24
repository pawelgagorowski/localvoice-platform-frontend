/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, LoadingState } from './state';

const createGetter = createGetterFactory<LoadingState, RootState>();

export const getters = {
  getStructureLoadingStatus: createGetter((state) => state.loading.structure),
};

export const loadingGetters = createGetterMap<typeof getters, LoadingState, RootState>(NAMESPACE, getters);
