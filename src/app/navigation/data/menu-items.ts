import { AuthPermission } from '~app/modules/auth';

export function getMenuItems() {
  return [
    {
      id: 1,
      title: 'Voicebot',
      icon: 'mdi-view-dashboard',
      group: 'voicebot',
      permissions: [AuthPermission.VOICEBOT],
      children: [
        {
          title: 'List of Lessons',
          icon: 'mdi-circle-medium',
          to: 'list-of-lessons',
        },
        {
          title: 'Create Lesson',
          icon: 'mdi-circle-medium',
          to: 'create-lesson',
        },
        {
          title: 'Create Course',
          icon: 'mdi-circle-medium',
          to: 'create-course',
        },
        {
          title: 'Monthly Challenge',
          icon: 'mdi-circle-medium',
          to: 'monthly-challenge',
        },
      ],
    },
    {
      id: 2,
      title: 'Chatbot',
      icon: 'mdi-apps-box',
      group: 'chatbot',
      children: [
        {
          title: 'List of Lessons',
          icon: 'mdi-circle-medium',
          to: 'list-of-lessons',
        },
      ],
    },
  ];
}
