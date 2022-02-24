/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { FormGroup } from '~app/shared/form';
import { NAMESPACE, ValidationState } from './state';
import { ValidationMutations } from './mutation';

const createAction = createActionFactory<ValidationState, RootState>();

export const actions = {
  addValidationForm: createAction(({ commit }, validationForm: FormGroup<any>) => {
    commit(ValidationMutations.setStructureValidation.local, validationForm);
  }),
  clearValidationForm: createAction(({ commit }, validationForm: FormGroup<any>) => {
    commit(ValidationMutations.clearValidation.local, validationForm);
  }),
  processValidation: createAction(({ commit }, validationForm: FormGroup<any>) => {
    commit(ValidationMutations.validate.local, validationForm);
  }),
};

export const validationActions = createActionMap<typeof actions, ValidationState, RootState>(NAMESPACE, actions);
