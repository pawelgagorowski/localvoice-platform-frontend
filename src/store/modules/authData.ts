export default {
  state: {
    loggedInUser: localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')) : null,
    loading: false,
    error: null,
  },
  getters: {
    loggedInUser: (state) => state.loggedInUser,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
  mutations: {
    setUser(state, data) {
      state.loggedInUser = data;
      state.loading = false;
      state.error = null;
    },
    setLogout(state) {
      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
      // this.$router.go("/");
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
};
