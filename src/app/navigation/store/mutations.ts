import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { MenuItem } from '../model';
import { entityAdapter, NAMESPACE, NavigationState } from './state';

const createMutation = createMutationFactory<NavigationState>();

export const mutations = {
  setNavigation: createMutation((state, items: MenuItem[]) => {
    entityAdapter.addAll(items, state);
    state.loaded = true;
  }),
};

export const navigationMutations = createMutationMap<typeof mutations, NavigationState>(NAMESPACE, mutations);
