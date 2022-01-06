import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync'; // adds a route module into the store - store.state.route.path
import { IS_DEV } from '../env';
import { router } from '../router';
import { RootState } from './state';

Vue.use(Vuex);

export const store = new Vuex.Store<RootState>({
  strict: IS_DEV,
});

sync(store, router);

export * from './state';
