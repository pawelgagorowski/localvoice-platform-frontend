/* eslint-disable class-methods-use-this */
import { CrossStorageClient } from 'cross-storage';
import { Config } from '~app/core/config';
import { store } from '~app/core/store';
import { createUrl } from '~app/shared';
import { configGetters } from '~app/core/config/store';
import { AuthToken, exportAuthToken, importAuthToken } from './token';

export const TOKEN_STORAGE_KEY = 'Localvoice@%DOMAIN%';
export const TOKEN_STORAGE_PATH = 'token.html';

export class TokenStorage {
  private readonly key: string;

  constructor(private config: Config) {
    this.key = TOKEN_STORAGE_KEY.replace('%DOMAIN%', store.getters[configGetters.getBackendEnvironment]);
  }

  load(): Promise<AuthToken | null> {
    return this.action((storage: CrossStorageClient) => {
      return storage.get(this.key).then((res: string) => (res ? importAuthToken(res) : null));
    });
  }

  store(token: AuthToken): Promise<void> {
    return this.action((storage: CrossStorageClient) => storage.set(this.key, exportAuthToken(token)));
  }

  clear(): Promise<void> {
    return this.action((storage: CrossStorageClient) => storage.del(this.key));
  }

  private action<T = void>(action: (storage: CrossStorageClient) => Promise<T>): Promise<T> {

    const storage = new CrossStorageClient(createUrl('/', TOKEN_STORAGE_PATH), {
      timeout: 30000,
    });
    return storage
      .onConnect()
      .then(() => {
        return action(storage);
      })
      .finally(() => storage.close());
  }
}
