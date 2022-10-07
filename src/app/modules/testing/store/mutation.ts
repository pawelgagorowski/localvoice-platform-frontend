/* eslint-disable import/no-cycle */
import { FormGroup } from '~app/shared/form';
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, ValidationState } from './state';

const createMutation = createMutationFactory<ValidationState>();

export const mutations = {
  setStructureValidation: createMutation((state, validationForm: FormGroup<any>) => {
    console.log('setStructureValidation');
    state.structure.validationList.push(validationForm);
  }),
  clearValidation: createMutation((state) => {
    console.log('clearValidation mutation');
    state.structure.validationList.map((el) => el.reset());
  }),
  validate: createMutation((state) => {
    console.log('validate mutation');
    state.structure.validationList.map((el) => el.validate());
  }),
};

export const ValidationMutations = createMutationMap<typeof mutations, ValidationState>(NAMESPACE, mutations);
