import { RouteConfig } from 'vue-router';
import { featureGuard } from '~app/core/config';
import { RouterView } from '~app/core/router';

export const voicebotRoutes: RouteConfig[] = [
  {
    path: '/app/voicebot',
    component: RouterView,
    // beforeEnter: featureGuard('voicebots'),
    children: [
      {
        path: 'list-of-lessons',
        name: 'list-of-lessons',
        meta: {
          breadcrumb: [{ name: 'Voicebot' }, { name: 'List of Lessons' }],
        },
        component: () => import(/* webpackChunkName: "listOfLessons" */ './lessonList/views/lessonList.vue'),
      },
      {
        path: 'create-lesson',
        name: 'create-lesson',
        meta: {
          breadcrumb: [{ name: 'Voicebot' }, { name: 'Create Lesson' }],
        },
        component: () => import(/* webpackChunkName: "createLesson" */ './lesson/views/createLesson.vue'),
      },
      {
        path: 'create-course',
        name: 'create-course',
        meta: {
          breadcrumb: [{ name: 'Voicebot' }, { name: 'Create Course' }],
        },
        component: () => import(/* webpackChunkName: "createCourse" */ './structure/views/structure.vue'),
      },
      {
        path: 'monthly-challenge',
        name: 'monthly-challenge',
        meta: {
          breadcrumb: [{ name: 'Voicebot' }, { name: 'Monthly Challenge' }],
        },
        component: () => import(/* webpackChunkName: "listOfLesson" */ './lessonList/views/lessonList.vue'),
      },
    ],
  },
];
