import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, LoadingState } from './state';

const createMutation = createMutationFactory<LoadingState>();

export const mutations = {
  setStructureLoading: createMutation((state, loadingStatus: boolean) => {
    state.loading.structure = loadingStatus;
  }),
};

export const structureMutations = createMutationMap<typeof mutations, LoadingState>(NAMESPACE, mutations);
