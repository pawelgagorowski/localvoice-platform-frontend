import { RootState } from '@/app/core/store';
import { createActionFactory, createActionMap } from '@/app/shared/vuex';
import { layoutMutations } from './mutations';
import { NAMESPACE } from './state';
import { LayoutState } from '../types';

const createAction = createActionFactory<LayoutState, RootState>();

export const actions = {
  changeSidebarSize: createAction(({ commit }) => {
    commit(layoutMutations.SET_SIDEBAR_SIZE.local);
  }),
  changeSidebarVisibility: createAction(({ commit }) => {
    commit(layoutMutations.SET_SIDEBAR_VISIBILITY.local);
  }),
  changeBackgroundMode: createAction(({ commit }) => {
    console.log('changeBackgroundMode');
    commit(layoutMutations.SET_BACKGROUND_MODE.local);
  }),
};

export const layoutActions = createActionMap<typeof actions, LayoutState, RootState>(NAMESPACE, actions);
