import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { LAYOUT_STORAGE_KEY, NAMESPACE } from './state';
import { LayoutState, LayoutMode, BackgroundColor } from '../types';

const createMutation = createMutationFactory<LayoutState>();

export const mutations = {
  SET_SIDEBAR_SIZE: createMutation((state) => {
    const { isSidebarMinimized } = state;
    state.isSidebarMinimized = !isSidebarMinimized;
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(state));
  }),
  SET_SIDEBAR_VISIBILITY: createMutation((state) => {
    const { isSidebarVisible } = state;
    state.isSidebarVisible = !isSidebarVisible;
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(state));
  }),
  SET_BACKGROUND_MODE: createMutation((state) => {
    const layoutMode = state.layoutMode === LayoutMode.DARK ? LayoutMode.WHITE : LayoutMode.DARK;
    const isDarkMode = layoutMode === LayoutMode.DARK;
    const backgroundColor = layoutMode === LayoutMode.DARK ? BackgroundColor.DARK : BackgroundColor.WHITE;
    state.layoutMode = layoutMode;
    state.backgroundColor = backgroundColor;
    state.isDarkMode = isDarkMode;
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(state));
  }),
};

export const layoutMutations = createMutationMap<typeof mutations, LayoutState>(NAMESPACE, mutations);
