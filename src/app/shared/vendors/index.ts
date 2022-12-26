import { PluginObject } from 'vue';
import WebFontLoader from 'webfontloader';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import VueMeta from 'vue-meta';
import LogRocket from 'logrocket';

export const VendorsPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.use(VueMeta);
    Vue.component('VuePerfectScrollbar', VuePerfectScrollbar);
    LogRocket.init('9r8zu6/localvoice');

    // async load fonts
    WebFontLoader.load({
      google: {
        families: ['Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap']
      }
    });
  }
};
