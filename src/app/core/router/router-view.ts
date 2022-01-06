import Vue, { VNode } from 'vue';

export const RouterView = Vue.extend({
  // eslint-disable-next-line vue/name-property-casing
  name: 'empty-router-view',
  render(h): VNode {
    return h('router-view');
  },
});
