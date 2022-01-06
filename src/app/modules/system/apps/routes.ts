/* eslint-disable no-shadow */
import { RouteConfig } from 'vue-router';
import { featureGuard } from '~app/core/config';

export enum AppRouteName {
  LIST = 'app-list',
}

export const appsRoutes: RouteConfig[] = [
  {
    path: 'apps',
    name: AppRouteName.LIST,
    beforeEnter: featureGuard('connectedApps'),
    component: () => import(/* webpackChunkName: "apps" */ './views/apps-list.vue'),
  },
];
