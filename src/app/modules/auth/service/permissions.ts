/* eslint-disable import/no-cycle */
import { store } from '~app/core/store';
import { coerceArray } from '~app/shared';
import { AuthPermission } from '../model';
import { authGetters } from '../store';

export type PermissionsCheckMode = 'AND' | 'OR';

export function checkAccess(
  permissions: AuthPermission[],
  required: AuthPermission | AuthPermission[],
  mode: PermissionsCheckMode = 'AND'
): boolean {
  const array = coerceArray(required);
  if (!array.length) {
    return true;
  }

  return mode === 'AND'
    ? array.every((perm) => permissions.includes(perm))
    : array.some((perm) => permissions.includes(perm));
}

export function userHasAccess(
  required: AuthPermission | AuthPermission[],
  mode: PermissionsCheckMode = 'AND'
): boolean {
  return checkAccess(store.getters[authGetters.getPermissions], required, mode);
}
