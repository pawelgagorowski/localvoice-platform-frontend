/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap, Dictionary } from '~app/shared/vuex';
import { NAMESPACE, NavigationState } from './state';
import { MenuItem } from '../model';

const createGetter = createGetterFactory<NavigationState, RootState>();

export const getters = {
  getOrderedSidebarItems: createGetter((state) => {
    return state.ids.reduce<MenuItem[]>((acc, id) => {
      if(state.entities[id]) {
        acc.splice(Number(id), 0, state.entities[id]!);
        return acc;
      }
      return acc
    }, [] as MenuItem[]);
  }),
};

export const navigationGetters = createGetterMap<typeof getters, NavigationState, RootState>(NAMESPACE, getters);
