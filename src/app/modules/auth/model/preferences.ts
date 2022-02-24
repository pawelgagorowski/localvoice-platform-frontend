import { JsonProperty } from '~app/shared';

export class AuthUserPreferences {
  id: number | undefined = undefined;

  language: string | undefined = undefined;

  @JsonProperty('ianaTimeZone')
  timezone: string | undefined = undefined;
}

export type AuthUserPreferencesForm = Pick<AuthUserPreferences, 'id' | 'language' | 'timezone'>;
