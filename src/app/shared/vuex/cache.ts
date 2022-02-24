import { Action } from 'vuex';

type VuexCacheRecord = { expiresIn?: number; value: Promise<any> };
type VuexCacheMap = { [key: string]: VuexCacheRecord };
type VuexCacheOptions = { cacheId: string; timeout?: number };

export const DEFAULT_CACHE_TIMEOUT = 10 * 60 * 1000; // 10m

/**
 * Generates cache key for given action payload.
 * When payload is an object, cache key MUST be stable.
 * Here using native JSON.stringify with sorted list of properties,
 * which isn't good for complex/nested objects.
 * If that's the case, we should consider using https://npmjs.org/package/json-stable-stringify
 */
const isObject = (value: any) => !!value && typeof value === 'object';
const generateKey = (payload: any) =>
  isObject(payload) ? JSON.stringify(payload, Object.keys(payload).sort()) : String(payload);

const state: { [cacheId: string]: VuexCacheMap } = {};

const resolveTimeout = (actionPayload: any, options: VuexCacheOptions) => {
  if (isObject(actionPayload) && 'cacheTimeout' in actionPayload) {
    return typeof actionPayload.cacheTimeout === 'string'
      ? parseInt(actionPayload.cacheTimeout, 10)
      : actionPayload.cacheTimeout;
  }

  return 'timeout' in options ? options.timeout : DEFAULT_CACHE_TIMEOUT;
};

const isExpired = (expiresIn: number) => !!expiresIn && Date.now() > expiresIn;

export function createCachedAction<S, R>(action: Action<S, R>, options: VuexCacheOptions): Action<S, R> {
  const { cacheId } = options;

  if (state[cacheId]) {
    throw new Error(`Duplicated cache id '${options.cacheId}'`);
  }

  state[cacheId] = {};

  return function cachedAction(context, payload?) {
    const cache = state[cacheId];
    const key = generateKey(payload);
    const { value, expiresIn } = cache[key] || {};

    if (expiresIn && !isExpired(expiresIn)) {
      return value;
    }

    const timeout = resolveTimeout(payload, options);
    const record = {
      expiresIn: timeout ? Date.now() + timeout : undefined,
      value: 'handler' in action ? action.handler.call(this, context, payload) : action.call(this, context, payload),
    };

    cache[key] = record;

    return record.value.catch((error: Error) => {
      delete cache[key];
      return Promise.reject(error);
    });
  };
}
