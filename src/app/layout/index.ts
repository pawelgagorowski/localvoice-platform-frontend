import { store } from '@/app/core/store';
import { layoutStore, NAMESPACE } from './store';

store.registerModule(NAMESPACE, layoutStore);

export const LayoutLoader = () => import(/* webpackChunkName: "layout" */ './loader.vue');
