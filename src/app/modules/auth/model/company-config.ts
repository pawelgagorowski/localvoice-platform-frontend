import { JsonProperty } from '~app/shared/json-mapper';

export class CompanyConfig {
  apiServer: string = undefined;

  webServer: string = undefined;

  logoFile: string = undefined;

  @JsonProperty('ianaTimeZone')
  timezone: string = undefined;
}
