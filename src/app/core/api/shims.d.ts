import { ApiClient } from './client';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $api: ApiClient;
  }
}
