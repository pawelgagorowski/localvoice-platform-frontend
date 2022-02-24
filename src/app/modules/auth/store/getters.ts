/* eslint-disable import/no-cycle */
import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { AuthState, NAMESPACE } from './state';

const createGetter = createGetterFactory<AuthState, RootState>();

export const getters = {
  isAuthorized: createGetter((state) => !!state.user),
  getUser: createGetter((state) => state.user),
  getPermissions: createGetter((state) => state.user?.permissions || []),
  getLanguage: createGetter((state) => state.user?.language),
};

export const authGetters = createGetterMap<typeof getters, AuthState, RootState>(NAMESPACE, getters);
