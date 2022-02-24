import { SysToast } from './types';

declare module 'vue/types/vue' {
  interface Vue {
    $toast: SysToast;
  }
}
