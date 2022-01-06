import { RouteConfig } from 'vue-router';
import { RouterView } from '~app/core/router';
import { appsRoutes } from './apps/routes';

export const systemRoutes: RouteConfig[] = [
  {
    path: 'system',
    component: RouterView,
    children: [...appsRoutes],
  },
];
