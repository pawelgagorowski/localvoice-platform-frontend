import { AuthUser } from '../model';

export const NAMESPACE = 'auth';

export interface AuthState {
  user: AuthUser | null;
}

export function initialState(): AuthState {
  return {
    user: null,
  };
}
