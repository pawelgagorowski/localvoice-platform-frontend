import { JsonProperty } from '~app/shared/json-mapper';

export class CompanyConfig {
  apiServer: string | undefined = undefined;

  webServer: string | undefined = undefined;

  logoFile: string | undefined = undefined;

  @JsonProperty('ianaTimeZone')
  timezone: string | undefined = undefined;
}
