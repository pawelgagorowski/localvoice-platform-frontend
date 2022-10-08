/* eslint-disable import/no-cycle */
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
  'es-MX': es
};

/** Current time in user's timezone. */
export function now(): Date | null {
  if (timezone.current) return utcToZonedTime(new Date(), timezone.current);
  return null;
}

export function toUtc(date: Date | string | number): Date | null {
  if (timezone.current) return zonedTimeToUtc(date, timezone.current);
  return null;
}

export function toUtcString(date: Date | string | number): string | null {
  if (date) return toUtc(date)!.toISOString();
  return null;
}

export function formatDate(date: Date, format = 'PP', options?: OptionsWithTZ): string | null {
  return date
    ? dateFnsFormat(date, format, {
        locale: dateLocales[i18n.locale],
        timeZone: timezone.current || undefined,
        ...options
      })
    : null;
}

export const dateZonedConverter: Converter = {
  fromJson(date: string): Date | null {
    if (timezone.current) return date ? utcToZonedTime(date, timezone.current) : null;
    return null;
  },
  toJson(date: Date): string | null {
    if (timezone.current) return date ? zonedTimeToUtc(date, timezone.current).toISOString() : null;
    return null;
  }
};
