import { hasFeature } from '~app/core/config';
import { i18n } from '~app/core/i18n';
import { RootState } from '~app/core/store';
import { userHasAccess } from '~app/modules/auth/service/permissions';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { getMenuItems } from '../data/menu-items';
import { navigationMutations } from './mutations';
import { NAMESPACE, NavigationState } from './state';

const createAction = createActionFactory<NavigationState, RootState>();

export const actions = {
  loadNavigation: createAction(({ commit }) => {
    return Promise.resolve(getMenuItems()).then((items) => {
      let accessedItems = items;
      if (hasFeature('permissions')) {
        accessedItems = items.filter((item) => userHasAccess(item.permissions, 'OR'));
      }
      commit(navigationMutations.setNavigation.local, accessedItems);
    });
  }),
};

export const navigationActions = createActionMap<typeof actions, NavigationState, RootState>(NAMESPACE, actions);
