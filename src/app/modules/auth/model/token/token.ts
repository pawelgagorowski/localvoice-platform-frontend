import jwtDecode from 'jwt-decode';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  userId: string;
  backendEnvironment: string;
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

// TODO change it when it's done
export function importAuthToken(response: string): AuthToken {
  console.log('importAuthToken', response);
  const res = JSON.parse(response);
  const jwt = jwtDecode<AuthJwtToken>(res.accessToken);

  return {
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
    userId: jwt.userId,
    backendEnvironment: res.backendEnvironment,
  };
}

export function exportAuthToken(token: AuthToken): string {
  return JSON.stringify({
    ...token,
  });
}
