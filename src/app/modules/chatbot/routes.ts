import { RouteConfig } from 'vue-router';
import { featureGuard } from '~app/core/config';
import { RouterView } from '~app/core/router';

export const chatbotRoutes: RouteConfig[] = [
  {
    path: '/app/chatbot',
    component: RouterView,
    // beforeEnter: featureGuard('voicebots'),
    children: [
      {
        path: 'list-of-lessons',
        name: 'list-of-lessons',
        meta: {
          breadcrumb: [{ name: 'Chatbot' }, { name: 'List of Lessons' }],
        },
        component: () => import(/* webpackChunkName: "listOfLessons" */ './lessonList/views/lessonList.vue'),
      },
    ],
  },
];
