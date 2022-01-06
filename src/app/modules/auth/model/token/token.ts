import jwtDecode from 'jwt-decode';

export interface AuthToken {
  access: string;
  refresh: string;
  rememberMe: boolean;
  userId: number;
}

export interface AuthJwtToken {
  aud: string;
  companyId: string;
  databaseName: string;
  databaseServerName: string;
  exp: number;
  iss: string;
  userId: string;
  userIsSuper: string;
  userLogin: string;
}

export function importAuthToken(response: string): AuthToken {
  console.log('importAuthToken');
  const res = JSON.parse(response);
  const jwt = jwtDecode<AuthJwtToken>(res.token);

  return {
    access: res.token,
    refresh: res.refreshToken,
    rememberMe: res.rememberMe,
    userId: parseInt(jwt.userId, 10),
  };
}

export function exportAuthToken(token: AuthToken): string {
  return JSON.stringify({
    token,
  });
}
