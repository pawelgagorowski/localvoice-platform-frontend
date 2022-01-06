import { store } from '~app/core/store';
import { APPS_STORE_NAMESPACE, appStore, AppStoreAction, AppStoreGetter } from './store';

store.registerModule(APPS_STORE_NAMESPACE, appStore);

export const appStoreAction = (action: AppStoreAction) => `${APPS_STORE_NAMESPACE}/${action}`;
export const appStoreGetter = (getter: AppStoreGetter) => `${APPS_STORE_NAMESPACE}/${getter}`;

export { AppStoreAction, AppStoreGetter };
