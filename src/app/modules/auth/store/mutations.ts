import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { AuthUser, AuthUserPreferences } from '../model';
import { AuthState, NAMESPACE } from './state';

const createMutation = createMutationFactory<AuthState>();

export const mutations = {
  setUser: createMutation((state, user: AuthUser) => {
    state.user = user;
  }),
};

export const authMutations = createMutationMap<typeof mutations, AuthState>(NAMESPACE, mutations);
