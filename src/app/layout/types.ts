/* eslint-disable no-shadow */
export enum LayoutMode {
  DARK = 'dark',
  WHITE = 'white',
}

export enum BackgroundColor {
  DARK = '#121212',
  WHITE = '#f2f3f8',
}

export interface LayoutState {
  layoutMode: LayoutMode;
  backgroundColor: BackgroundColor;
  isDarkMode: boolean;
  isSidebarMinimized: boolean;
  isSidebarVisible: boolean;
}
