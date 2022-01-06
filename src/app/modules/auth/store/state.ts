import { AuthUser, CompanyConfig } from '../model';

export const NAMESPACE = 'auth';

export interface AuthState {
  company: CompanyConfig | null;
  user: AuthUser | null;
}

export function initialState(): AuthState {
  return {
    company: null,
    user: null,
  };
}
