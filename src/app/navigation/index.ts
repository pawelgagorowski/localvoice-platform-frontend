import { InitializerTask } from '~app/core/initializer';
import { store } from '~app/core/store';

export const navigationInitializer: InitializerTask<void> = () => {
  return import(/* webpackChunkName: "navigation" */ './store').then((s) => {
    store.registerModule(s.NAMESPACE, s.navigationStore);

    return store.dispatch(s.navigationActions.loadNavigation);
  });
};
