// import { PlantListItem } from '~app/modules/plant';
import { identityConverter, JsonProperty } from '~app/shared';

export class AuthUserPreferences {
  id: number = undefined;

  language: string = undefined;

  @JsonProperty('ianaTimeZone')
  timezone: string = undefined;

  @JsonProperty({ converter: identityConverter('id', 'posPlant') })
  posPlantId?: number = undefined;
  // @JsonProperty({ excludeToJson: true })
  // posPlant?: PlantListItem = undefined;

  @JsonProperty('messengerAutostart')
  messengerAutoStart: boolean = undefined;

  // local / computed
  @JsonProperty({ excludeToJson: true })
  companyTimezone: string;

  @JsonProperty({ excludeToJson: true })
  forceTimezone: boolean;
}

export type AuthUserPreferencesForm = Pick<
  AuthUserPreferences,
  'id' | 'language' | 'timezone' | 'companyTimezone' | 'forceTimezone' | 'messengerAutoStart'
>;
