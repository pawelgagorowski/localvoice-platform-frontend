import { PluginFunction } from 'vue';
import { formatDate, now } from './date';
import { timezone } from './timezone';

export interface TimezonePlugin {
  readonly current: string;
  now(): Date;
}

export const TimezonePlugin: PluginFunction<void> = (Vue) => {
  const value: TimezonePlugin = {
    get current() {
      return timezone.current;
    },
    now,
  };

  Object.defineProperty(Vue.prototype, '$timezone', { value });

  Vue.filter('date', (date: any, format?: string) => formatDate(date, format));
};
