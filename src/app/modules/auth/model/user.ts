import { JsonProperty } from '~app/shared';
import { AuthPermission, AuthPermissionConverter } from './permission';

export class AuthUser {
  id: number = undefined;

  name: string = undefined;

  login: string = undefined;

  email: string = undefined;

  language: string = undefined;

  @JsonProperty('ianaTimeZone')
  timezone: string = undefined;

  divisionId: number = undefined;

  employeeId?: number = undefined;

  posPlantId?: number = undefined;

  roleIds: number[] = undefined;

  @JsonProperty({
    converter: { fromJson: AuthPermissionConverter.fromJson },
    excludeToJson: true,
  })
  permissions: AuthPermission[] = [];

  @JsonProperty('messengerAutostart')
  messengerAutoStart: boolean = undefined;

  readonly forcePasswordChange: boolean = undefined;
}
