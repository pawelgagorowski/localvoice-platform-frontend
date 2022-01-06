import { CrossStorageClient, CrossStorageHub } from 'cross-storage';
import { Config } from '~app/core/config';
import { createUrl } from '~app/shared';
import { AuthToken, exportAuthToken, importAuthToken } from './token';

export const TOKEN_STORAGE_KEY = 'ConcreteGoAuth@%DOMAIN%';
// export const TOKEN_STORAGE_PATH = '/public/token_storage.aspx';
export const TOKEN_STORAGE_PATH = 'token.html';

export class TokenStorage {
  private readonly key: string;

  constructor(private config: Config) {
    this.key = TOKEN_STORAGE_KEY.replace('%DOMAIN%', window.location.hostname);
  }

  load(): Promise<AuthToken | null> {
    console.log('load method in TokenStorage class');
    return this.action((storage: CrossStorageClient) => {
      console.log('load meethod ale już po callbacku!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('this.key', this.key);
      return storage.get(this.key).then((res) => (res ? importAuthToken(res) : null));
    });
  }

  store(token: AuthToken): Promise<void> {
    return this.action((storage: CrossStorageClient) => storage.set(this.key, exportAuthToken(token)));
  }

  clear(): Promise<void> {
    console.log('TokenStorage clear');
    return this.action((storage: CrossStorageClient) => storage.del(this.key));
  }

  private action<T = void>(action: (storage: CrossStorageClient) => Promise<T>): Promise<T> {
    console.log('action method in TokenStorage');

    const storage = new CrossStorageClient(createUrl(this.config.legacyWebServer, TOKEN_STORAGE_PATH), {
      timeout: 30000,
    });

    // CrossStorageHub.init([{ origin: /.*/, allow: ['get', 'set', 'del', 'clear'] }]);
    console.log('this.config.legacyWebServer', this.config.legacyWebServer);
    console.log(
      'reateUrl(this.config.legacyWebServer, TOKEN_STORAGE_PATH)',
      createUrl(this.config.legacyWebServer, TOKEN_STORAGE_PATH)
    );
    console.log('storage', storage);

    return storage
      .onConnect()
      .then(() => {
        console.log('po połączeniu z hubem');
        return action(storage);
      })
      .finally(() => storage.close());
  }
}
