import { createEntityAdapter, EntityState } from '~app/shared/vuex';
import { MenuItem } from '../model/types';

export const NAMESPACE = 'navigation';
export interface NavigationState extends EntityState<MenuItem> {
  loaded: boolean;
}

export const entityAdapter = createEntityAdapter<MenuItem>();

export function initialState(): NavigationState {
  return entityAdapter.getInitialState({
    loaded: false,
  });
}
