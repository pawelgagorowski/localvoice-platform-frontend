import { RootState } from '@/app/core/store';
import { createGetterFactory, createGetterMap } from '@/app/shared/vuex';
import { NAMESPACE } from './state';
import { LayoutState } from '../types';

const createGetter = createGetterFactory<LayoutState, RootState>();

export const getters = {
  getState: createGetter((state) => state),
};

export const layoutGetters = createGetterMap<typeof getters, LayoutState, RootState>(NAMESPACE, getters);
