import Vue from 'vue';
import { ApiClient } from '~app/core/api';
import { Config } from '~app/core/config';
import { setLanguage, setTimezone } from '~app/core/i18n';
import { router } from '~app/core/router';
import { store } from '~app/core/store';
// import { Auth0 } from '~app/modules/auth/model/auth0';
import AuthUserMenu from './components/user-menu.vue';
import { AuthPermission, TokenStorage } from './model';
import { AuthInjectKey, AuthService } from './service/auth.service';
import { userHasAccess } from './service/permissions';
import { authActions, authGetters, authStore, NAMESPACE } from './store';

// Import the Auth0 configuration
// import { domain, clientId } from '~app/core/auth_config.json';

// export function AuthModule(config: Config, api: ApiClient, auh0Client: any): Promise<any> {
//   console.log('AuthModule fn');
//   const authService = new AuthService(new TokenStorage(config), api);

//   return authService.initialize().then((token) => {
//     console.log('authService.initialize juz po');
//     console.log('token', token);
//     store.registerModule(NAMESPACE, authStore);
//     store.watch((state, getters) => getters[authGetters.getLanguage], setLanguage);
//     store.watch((state, getters) => getters[authGetters.getTimezone], setTimezone);

//     Object.defineProperty(Vue.prototype, '$permission', {
//       get() {
//         return AuthPermission;
//       },
//     });
//     Object.defineProperty(Vue.prototype, '$auth', {
//       get() {
//         return {
//           hasAccess: userHasAccess,
//         };
//       },
//     });
//     Vue.mixin({ provide: { [AuthInjectKey]: authService } });
//     Vue.component('auth-user-menu', AuthUserMenu);

//     router.beforeEach((to, from, next) => {
//       console.log('beforeEach');
//       const isAuthorized: boolean = store.getters[authGetters.isAuthorized];
//       const isGuest = to.matched.some((r) => r.meta.guest);

//       if (isGuest) {
//         console.log('isGuest');
//         return isAuthorized ? next('/') : next();
//       }

//       if (!isAuthorized) {
//         console.log('!isAuthorized');
//         // return authService.logout();
//         try {
//           const authCLient = new Auth0({ domain, clientId });
//           console.log('authCLient', authCLient);
//           return authCLient.loginWithRedirect();
//         } catch (e) {
//           console.log('e', e);
//         }
//       }

//       if (!userHasAccess(to.meta.permissions)) {
//         Vue.nextTick(() => {
//           router.app.$toast.danger(
//             router.app.$t('Sorry, you do not have sufficient permissions to execute this action.')
//           );
//         });
//         return from ? next(from) : next('/');
//       }

//       next();
//     });

//     if (!token) {
//       return Promise.resolve(null);
//     }
//     console.log('mamy token????????????????????', token);

//     return Promise.all([store.dispatch(authActions.getUserFromAuth0Service, auh0Client)]);
//   });
// }
