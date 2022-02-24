import Vue from 'vue';
import { api } from '../api';

export const timezone: { current: string | null } = Vue.observable({
  current: null,
});

export function setTimezone(value: string) {
  timezone.current = value;
}

let timezones: Promise<string[]>;

export function listTimezones(): Promise<string[]> {
  if (!timezones) {
    timezones = api.get('/api/type/timezone').then((res) => res.data);
  }

  return timezones;
}
