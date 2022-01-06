import { DirectiveFunction } from 'vue';
import { NavigationGuard } from 'vue-router';
import { store } from '~app/core/store';
import { commentNode } from '~app/shared';
import { configGetters } from './store';
import { FeatureName } from './types';

export function hasFeature(feature: FeatureName | FeatureName[]): boolean {
  return store.getters[configGetters.hasFeature](feature);
}

export function featureGuard(feature: FeatureName | FeatureName[]): NavigationGuard {
  return (to, from, next) => next(hasFeature(feature) ? undefined : from);
}

export const FeatureDirective: DirectiveFunction = (el, binding, vnode) => {
  if (!hasFeature(binding.value)) {
    commentNode(el, vnode);
  }
};
