import { PluginObject } from 'vue';
import Notification from './Notification.vue';
import Search from './Search.vue';
import User from './User.vue';

export const DrawerComponentsPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.component(Notification.name, Notification);
    Vue.component(Search.name, Search);
    Vue.component(User.name, User);
  },
};
