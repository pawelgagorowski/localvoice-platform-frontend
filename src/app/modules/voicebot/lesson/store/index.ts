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

console.log('hello from create lesson!!!!!!!!!!');

export * from './state';
export { lessonActions } from './actions';
export { lessonGetters } from './getters';
