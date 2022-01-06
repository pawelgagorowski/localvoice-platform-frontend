import { RouteConfig } from 'vue-router';
import { NotFound, RouterView } from '~app/core/router';
import { voicebotRoutes } from '~app/modules/voicebot';

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
              import(/* webpackChunkName: "listOfLesson" */ '~app/modules/voicebot/views/listOfLessons.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];
