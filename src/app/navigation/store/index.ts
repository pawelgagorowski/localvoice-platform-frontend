import { Module } from 'vuex';
import { RootState } from '~app/core/store';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { initialState, NavigationState } from './state';

export const navigationStore: Module<NavigationState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

export * from './state';
export { navigationGetters } from './getters';
export { navigationActions } from './actions';
