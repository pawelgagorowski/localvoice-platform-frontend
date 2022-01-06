import { Locale } from 'date-fns';
import { format as dateFnsFormat, OptionsWithTZ, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { enAU, enUS, es } from 'date-fns/locale';
import { Converter } from '~app/shared/json-mapper';
import { i18n } from './i18n';
import { timezone } from './timezone';

const dateLocales: { [key: string]: Locale } = {
  'en-US': enUS,
  'en-AU': enAU,
  'en-NZ': enAU,
  'es-MX': es,
};

/** Current time in user's timezone. */
export function now(): Date {
  return utcToZonedTime(new Date(), timezone.current);
}

export function toUtc(date: Date | string | number): Date {
  return zonedTimeToUtc(date, timezone.current);
}

export function toUtcString(date: Date | string | number): string {
  return toUtc(date).toISOString();
}

export function formatDate(date: Date, format = 'PP', options?: OptionsWithTZ): string {
  return date
    ? dateFnsFormat(date, format, {
        locale: dateLocales[i18n.locale],
        timeZone: timezone.current,
        ...options,
      })
    : null;
}

export const dateZonedConverter: Converter = {
  fromJson(date: string): Date {
    return date ? utcToZonedTime(date, timezone.current) : null;
  },
  toJson(date: Date): string {
    return date ? zonedTimeToUtc(date, timezone.current).toISOString() : null;
  },
};
