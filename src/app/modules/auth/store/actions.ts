import { AxiosError } from 'axios';
import { api } from '~app/core/api';
import { hasFeature } from '~app/core/config';
import { configMutations } from '~app/core/config/store';
import { RootState } from '~app/core/store';
// import { divisionMutations } from '~app/modules/division/store';
// import { plantActions } from '~app/modules/plant';
import { deserialize, serialize } from '~app/shared';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { AuthPermission, AuthUser, AuthUserPreferences, CompanyConfig } from '../model';
import { authMutations } from './mutations';
import { AuthState, NAMESPACE } from './state';

const createAction = createActionFactory<AuthState, RootState>();

export const actions = {
  fetchCompanyConfig: createAction(({ commit }) => {
    return api
      .get<CompanyConfig>('/api/account/me/company/configuration')
      .then((res) => deserialize(CompanyConfig, res.data))
      .then((config) => {
        commit(configMutations.setCompany.namespaced, config, { root: true });
        commit(authMutations.setCompanyConfig.local, config);
      });
  }),

  fetchUser: createAction(({ commit }) => {
    console.log('fetchUser action');
    return api
      .get<AuthUser>('/api/account/me')
      .then((res) => {
        const user = deserialize(AuthUser, res.data);
        commit(authMutations.setUser.local, user);
        // TODO dependency inversion
        // commit(divisionMutations.setCurrentId.namespaced, user.divisionId, { root: true });
      })
      .catch((e: AxiosError) => {
        if (e.response.status < 500) {
          // eg. 404 = account removed
          return;
        }

        throw e;
      });
  }),

  getUserFromAuth0Service: createAction(async ({ commit }, auth0CLient: any) => {
    console.log('getUserFromAuth0Service');
    console.log('auth0CLient', auth0CLient);
    const user = await auth0CLient.getUser();
    console.log('user w getUserFromAuth0Service', user);
    commit(authMutations.setUser.local, user);
  }),

  fetchPreferences: createAction(({ state, dispatch }) => {
    const fetch: Promise<any> = dispatch(authActions.fetchUser, null, { root: true });

    return fetch.then(() => {
      const { user } = state;
      const resolve: Promise<any>[] = [];

      // if (user.posPlantId && hasFeature('userPosPlant')) {
      //   resolve.push(dispatch(plantActions.resolve, { ids: [user.posPlantId] }, { root: true }));
      // }

      return Promise.all(resolve);
    });
  }),

  savePreferences: createAction(({ commit }, payload: AuthUserPreferences) => {
    return api
      .put('/api/account/me', serialize(payload))
      .then((res) => commit(authMutations.setUserPreferences.local, deserialize(AuthUserPreferences, res.data)));
  }),
};

export const authActions = createActionMap<typeof actions, AuthState, RootState>(NAMESPACE, actions);
