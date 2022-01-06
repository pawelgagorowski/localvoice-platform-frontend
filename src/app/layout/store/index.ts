import { Module } from 'vuex';
import { RootState } from '~app/core/store';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { initialState } from './state';
import { LayoutState } from '../types';

export const layoutStore: Module<LayoutState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

export * from './state';
export { layoutActions } from './actions';
export { layoutGetters } from './getters';
