import Vue from 'vue';
import { ApiClient } from '~app/core/api';
import { Config } from '~app/core/config';
import { setLanguage } from '~app/core/i18n';
import { router } from '~app/core/router';
import { store } from '~app/core/store';
import { voicebotActions } from '../voicebot/structure/store';
import { AuthPermission, TokenStorage } from './model';
import { AuthInjectKey, AuthService } from './service/auth.service';
import { userHasAccess } from './service/permissions';
import { authActions, authGetters, authStore, NAMESPACE } from './store';

export function AuthModule(config: Config, api: ApiClient): Promise<any> {
  const authService = new AuthService(new TokenStorage(config), api);

  return authService.initialize().then((token) => {
    store.registerModule(NAMESPACE, authStore);
    store.watch((state, getters) => getters[authGetters.getLanguage], setLanguage);

    Object.defineProperty(Vue.prototype, '$permission', {
      get() {
        return AuthPermission;
      },
    });
    Object.defineProperty(Vue.prototype, '$auth', {
      get() {
        return {
          hasAccess: userHasAccess,
        };
      },
    });

    Vue.mixin({ provide: { [AuthInjectKey]: authService } });
    console.log('hello before router');

    router.beforeEach((to, from, next) => {
      const isAuthorized: boolean = store.getters[authGetters.isAuthorized];
      const isGuest = to.matched.some((r) => r.meta.guest);

      if (isGuest) {
        return isAuthorized ? next('/') : next();
      }

      // TODO change it when it's done
      if (!isAuthorized) {
        return authService.logout();
      }

      //   if (!userHasAccess(to.meta.permissions)) {
      //     Vue.nextTick(() => {
      //       router.app.$toast.danger(
      //         router.app.$t('Sorry, you do not have sufficient permissions to execute this action.')
      //       );
      //     });
      //     return from ? next(from) : next('/');
      //   }

      return next();
    });

    if (!token) {
      return Promise.resolve(null);
    }

    return Promise.all([store.dispatch(authActions.fetchUser), store.dispatch(voicebotActions.fetchStructure)]);
    // return Promise.all([]);
  });
}
