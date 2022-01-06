import Vue from 'vue';
import { nl2br } from './filters';

Vue.filter('nl2br', nl2br);

export * from './slot';
export * from './vnode';
