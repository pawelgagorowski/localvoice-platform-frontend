/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
const state = {
  verticalSidebar: {
    isVerticalSidebar: true,
    isVerticalCompact: false,
    isMobileCompact: true,
  },
  verticalCompact: {
    isSidebarCompact: false,
    isItemName: false,
  },
};

const getters = {
  getVerticalSidebar: (state: { verticalSidebar: any }) => state.verticalSidebar,
  getVerticalCompact: (state: { verticalCompact: any }) => state.verticalCompact,
};

const actions = {
  switchSidebar({ commit }: any, data: any) {
    commit('SWITCH_SIDEBAR', data);
  },
  sidebarCompact({ commit }: any, data: any) {
    commit('SIDEBAR_COMPACT', data);
  },
  removeSidebarCompact({ commit }: any, data: any) {
    commit('REMOVE_SIDEBAR_COMPACT', data);
  },
  mobileSidebar({ commit }: any, data: any) {
    commit('MOBILE_SIDEBAR', data);
  },
};

const mutations = {
  SWITCH_SIDEBAR(state: { verticalSidebar: { isVerticalSidebar: boolean; isVerticalCompact: boolean } }, data: any) {
    state.verticalSidebar.isVerticalSidebar = !state.verticalSidebar.isVerticalSidebar;
    state.verticalSidebar.isVerticalCompact = !state.verticalSidebar.isVerticalCompact;
    console.log('test');
  },
  SIDEBAR_COMPACT(
    state: {
      verticalSidebar: { isVerticalSidebar: boolean };
      verticalCompact: { isSidebarCompact: boolean; isItemName: boolean };
    },
    data: any
  ) {
    if (state.verticalSidebar.isVerticalSidebar == false) {
      state.verticalCompact.isSidebarCompact = !state.verticalCompact.isSidebarCompact;
      state.verticalCompact.isItemName = !state.verticalCompact.isItemName;
    }
    console.log('test');
  },
  REMOVE_SIDEBAR_COMPACT(state: { verticalCompact: { isSidebarCompact: boolean; isItemName: boolean } }, data: any) {
    if (state.verticalCompact.isSidebarCompact == true) {
      state.verticalCompact.isSidebarCompact = !state.verticalCompact.isSidebarCompact;
      state.verticalCompact.isItemName = !state.verticalCompact.isItemName;
    }
  },
  MOBILE_SIDEBAR(state: { verticalSidebar: { isMobileCompact: boolean } }, data: any) {
    state.verticalSidebar.isMobileCompact = !state.verticalSidebar.isMobileCompact;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
