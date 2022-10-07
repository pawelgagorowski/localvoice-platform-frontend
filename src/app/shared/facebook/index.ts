import { PluginObject } from 'vue';
// import { LoginStatus } from 'facebook-sdk'

type Script = 'script';

declare global {
  interface Window {
    fbAsyncInit: any;
    FB: any;
  }
}

export const FacebookSDKPlugin: PluginObject<void> = {
  install(Vue) {
    (function (document: Document, script: Script, id: string) {
      console.log('hello from facebook module ');
      const fjs = document.getElementsByTagName(script)[0];
      if (document.getElementById(id)) return;
      const js = document.createElement(script);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      if (fjs.parentNode) fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    console.log('windows', window);
    window.fbAsyncInit = function onSDKInit() {
      console.log('hello from init');
      window.FB.init({
        appId: '1358537151286274',
        cookie: true,
        xfbml: true,
        version: 'v3.2',
      });

      //   FB.getLoginStatus((response) => {
      //     console.log('login response', response);
      //   });

      //   FB.logout((response) => {
      //     console.log('user logout', response);
      //   });
      // };
      // Vue.FB = undefined;
    };
  },
};
