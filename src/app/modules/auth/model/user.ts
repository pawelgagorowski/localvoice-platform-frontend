import { JsonProperty } from '~app/shared';
import { AuthPermission, AuthPermissionConverter } from './permission';

export class AuthUser {
  @JsonProperty('sk')
  id: number | undefined = undefined;

  firstName: string | undefined = undefined;

  email: string | undefined = undefined;

  language: string | undefined = undefined;

  @JsonProperty('business')
  company: string | undefined = undefined;

  @JsonProperty({
    converter: { fromJson: AuthPermissionConverter.fromJson },
    excludeToJson: true,
  })
  permissions: AuthPermission[] | [] = [];

  timezone: string | undefined = undefined;
}
