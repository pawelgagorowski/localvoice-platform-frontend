import { AuthPermission } from './model';
import { userHasAccess } from './service/permissions';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $permission: typeof AuthPermission;
    readonly $auth: {
      hasAccess: typeof userHasAccess;
    };
  }
}
