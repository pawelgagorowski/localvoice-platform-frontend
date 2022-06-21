/* eslint-disable import/no-cycle */
import { FormGroup } from '~app/shared/form';

export const NAMESPACE = 'validation';

export interface ValidationState {
  structure: {
    validationList: FormGroup<any>[];
  };
}

export function initialState(): ValidationState {
  return {
    structure: {
      validationList: [],
    },
  };
}
