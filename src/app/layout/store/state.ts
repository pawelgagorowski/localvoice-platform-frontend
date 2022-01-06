import { LayoutState, LayoutMode, BackgroundColor } from '../types';

export const LAYOUT_STORAGE_KEY = 'layout';
export const NAMESPACE = 'layout';

export function initialState(): LayoutState {
  const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  return {
    layoutMode: LayoutMode.WHITE,
    backgroundColor: BackgroundColor.WHITE,
    isSidebarVisible: true,
    isDarkMode: false,
    isSidebarMinimized: false,
  };
}
