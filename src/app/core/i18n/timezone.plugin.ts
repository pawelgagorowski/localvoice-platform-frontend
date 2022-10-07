import { PluginFunction } from 'vue';
import { formatDate, now } from './date';
import { timezone } from './timezone';

export interface TimezonePlugin {
  readonly current: string | null;
  now(): any;
}

export const TimezonePlugin: PluginFunction<void> = (Vue) => {
  const value: TimezonePlugin = {
    get current(): string | null {
      if (timezone.current) return timezone.current;
      return null;
    },
    now
  };

  Object.defineProperty(Vue.prototype, '$timezone', { value });

  Vue.filter('date', (date: any, format?: string) => formatDate(date, format));
};
