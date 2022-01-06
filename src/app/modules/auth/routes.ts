import { RouteConfig } from 'vue-router';
import { AuthPermission } from '~app/modules/auth/model';

export const authRoutes: RouteConfig[] = [
  {
    path: 'password',
    component: () => import(/* webpackChunkName: "auth" */ './components/password/page.vue'),
    meta: {
      permissions: [AuthPermission.ACCOUNT_PASSWORD_CHANGE],
    },
  },
  {
    path: 'preferences',
    name: 'auth-user-preferences',
    component: () => import(/* webpackChunkName: "auth" */ './components/preferences.vue'),
    meta: {
      permissions: [AuthPermission.ACCOUNT_PREFERENCES],
    },
  },
];

export const authRoutesPublic: RouteConfig[] = [
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import(/* webpackChunkName: "auth" */ './components/password-reset.vue'),
    meta: {
      guest: true,
      layout: 'public',
    },
  },
];
