/* eslint-disable import/no-cycle */
import { store } from '~app/core/store';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { initialState, NAMESPACE } from './state';

store.registerModule(NAMESPACE, {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
});

export * from './state';
export { voicebotGetters } from './getters';
export { voicebotActions } from './actions';
