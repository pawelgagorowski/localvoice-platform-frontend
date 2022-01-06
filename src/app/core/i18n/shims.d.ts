import { TimezonePlugin } from './timezone.plugin';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $timezone: TimezonePlugin;
  }
}
