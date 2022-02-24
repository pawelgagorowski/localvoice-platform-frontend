import { RouteConfig } from 'vue-router';
import { NotFound, RouterView } from '~app/core/router';
import { voicebotRoutes } from '~app/modules/voicebot/routes';

export const appRoutes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('~app/modules/index.vue'),
    // beforeEnter: authenticate,
    redirect: '/app/voicebot/list-of-lessons',
    children: [
      ...voicebotRoutes,
      {
        path: '/app/chatbot',
        component: RouterView,
        children: [
          {
            path: 'list-of-lessons',
            name: 'list-of-lessons',
            meta: {
              breadcrumb: [{ name: 'Chatbot' }, { name: 'List of Lessons' }],
            },
            component: () =>
              import(/* webpackChunkName: "listOfLesson" */ '~app/modules/voicebot/structure/views/listOfLessons.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/session',
    component: RouterView,
    name: 'session',
    redirect: '/session/sign-in',
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: () => import(/* webpackChunkName: "session" */ '~app/modules/session/views/SignIn.vue'),
      },
    ],
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import(/* webpackChunkName: "session" */ '~app/modules/session/views/SignIn.vue'),
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];
