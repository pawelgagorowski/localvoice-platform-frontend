import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { NAMESPACE, LoadingState } from './state';
import { structureMutations } from './mutation';

const createAction = createActionFactory<LoadingState, RootState>();

export const actions = {
  addVoicebotStructureLoadingStatus: createAction(({ commit }, loadingStatus: boolean) => {
    commit(structureMutations.setStructureLoading.local, loadingStatus);
  }),
};

export const loadingActions = createActionMap<typeof actions, LoadingState, RootState>(NAMESPACE, actions);
