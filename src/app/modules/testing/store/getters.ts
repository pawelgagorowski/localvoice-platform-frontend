/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap, Dictionary } from '~app/shared/vuex';
import { NAMESPACE, ValidationState } from './state';

const createGetter = createGetterFactory<ValidationState, RootState>();

export const getters = {
  getValidation: createGetter((state) => {
    state.structure.validationList.map((item) => {
      return item.validate();
    });
  }),
};

export const validationGetters = createGetterMap<typeof getters, ValidationState, RootState>(NAMESPACE, getters);
