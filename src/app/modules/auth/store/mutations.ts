import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { AuthUser, AuthUserPreferences, CompanyConfig } from '../model';
import { AuthState, NAMESPACE } from './state';

const createMutation = createMutationFactory<AuthState>();

export const mutations = {
  setCompanyConfig: createMutation((state, company: CompanyConfig) => {
    state.company = company;
  }),
  setUser: createMutation((state, user: AuthUser) => {
    state.user = user;
  }),
  setUserPreferences: createMutation((state, preferences: AuthUserPreferences) => {
    state.user.messengerAutoStart = preferences.messengerAutoStart;
    state.user.timezone = preferences.timezone;
    state.user.language = preferences.language;
    state.user.posPlantId = preferences.posPlantId;
  }),
};

export const authMutations = createMutationMap<typeof mutations, AuthState>(NAMESPACE, mutations);
