/* eslint-disable import/no-cycle */
import { Module } from 'vuex';
import { RootState } from '~app/core/store';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { AuthState, initialState } from './state';

export const authStore: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

export * from './state';
export { authGetters } from './getters';
export { authActions } from './actions';
