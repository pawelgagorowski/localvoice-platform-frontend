import { JsonProperty } from '~app/shared';

export class AppModel {
  id: number = undefined;

  companyId: number = undefined;

  name: string = undefined;

  appId: string = undefined;

  secret?: string = undefined;

  isActive = false;

  url?: string = undefined;

  @JsonProperty({ excludeToJson: true })
  connectUrl: string;

  @JsonProperty({ excludeToJson: true })
  disconnectUrl: string;
}
