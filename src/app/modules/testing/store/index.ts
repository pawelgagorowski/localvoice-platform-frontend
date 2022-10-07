import { store } from '~app/core/store';
import { actions } from './actions';
import { mutations } from './mutation';
import { getters } from './getters';
import { initialState, NAMESPACE } from './state';

store.registerModule(NAMESPACE, {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
});

console.log('hello from file!!!!!!!!');

export * from './state';
export { validationActions } from './actions';
export { validationGetters } from './getters';
