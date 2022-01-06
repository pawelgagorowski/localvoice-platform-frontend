import { hasFeature } from '~app/core/config';
import { RootState } from '~app/core/store';
import { AuthUserPreferences } from '~app/modules/auth';
// import { plantGetters } from '~app/modules/plant';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { AuthState, NAMESPACE } from './state';

const createGetter = createGetterFactory<AuthState, RootState>();

export const getters = {
  isAuthorized: createGetter((state) => !!state.user),

  getUser: createGetter((state) => state.user),
  getUserPreferences: createGetter((state) => {
    const { user, company } = state;
    const forceTimezone = Boolean(user.timezone && user.timezone !== company.timezone);

    const model: AuthUserPreferences = {
      ...user,
      timezone: forceTimezone ? user.timezone : null,
      companyTimezone: company.timezone,
      forceTimezone,
    };

    // if (model.posPlantId && hasFeature('userPosPlant')) {
    //   const plants = rootGetters[plantGetters.entities];
    //   model.posPlant = plants[model.posPlantId];
    // }

    return model;
  }),

  getPermissions: createGetter((state) => state.user?.permissions || []),

  getCompanyConfig: createGetter((state) => state.company),
  getCompanyLogo: createGetter((state) => {
    console.log('getCompanyLogo getter');
    return state.company?.logoFile ? `data:image/png;base64,${state.company?.logoFile}` : null;
  }),

  getLanguage: createGetter((state) => state.user?.language),
  getTimezone: createGetter((state) => state.user?.timezone || state.company?.timezone),
};

export const authGetters = createGetterMap<typeof getters, AuthState, RootState>(NAMESPACE, getters);
