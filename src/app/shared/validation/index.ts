/* eslint-disable no-param-reassign */
import VueI18n from 'vue-i18n';
import { CombinedVueInstance } from 'vue/types/vue';
import { FormGroup } from '../form/group';
import { objectKeys } from '../helpers';
import { ValidationForm, ValidationTarget } from '../types';

export function fillUpValidationForm<T>(data: {
  id: string;
  targets: ValidationTarget[];
  validationForm: ValidationForm<T>;
  data: FormGroup<T>;
}) {
  data.targets.forEach((target) => {
    if (!data.validationForm[target]) data.validationForm[target] = {};
    if (!data.validationForm[target][data.id]) data.validationForm[target][data.id] = {} as FormGroup<T>;
    data.validationForm[target][data.id] = data.data;
  });
}

export function areExampleCorrect<T>(data: {
  validationForm: ValidationForm<T>;
  target: ValidationTarget;
}): { isCorrect: boolean; errorMessages: VueI18n.TranslateResult[] } {
  console.log('data', data);
  const lessons = data.validationForm[data.target];
  const result: { isCorrect: boolean; errorMessages: VueI18n.TranslateResult[] } = {
    isCorrect: true,
    errorMessages: [],
  };
  let id: FormGroup<T>;
  objectKeys(lessons).forEach((key) => {
    id = lessons[key];
    id.validate();
    if (id.isAnyError) {
      result.isCorrect = false;
      result.errorMessages.push(...id.errorMessages);
    }
  });
  if (result.errorMessages.length > 0) {
    const { errorMessages } = result;
    result.errorMessages = [...new Set(errorMessages)];
  }
  return result;
}

export function deleteValidationFields<T>(data: { validationIds: string[]; validationForm: ValidationForm<T> }) {
  objectKeys(data.validationForm).forEach((target) => {
    objectKeys(data.validationForm[target]).forEach((validatorId) => {
      if (data.validationIds.includes(validatorId as string)) delete data.validationForm[target][validatorId];
    });
  });
}

export function emitValidation<T = any>(
  data: T,
  {
    form,
    instance,
    validationId,
    targets,
  }: {
    form: FormGroup<T>;
    instance: CombinedVueInstance<Vue, any, any, any, any>;
    validationId: string;
    targets: ValidationTarget[];
  }
) {
  const formCopy = form;
  formCopy.data = data as T;
  instance.$emit('validation', {
    data: formCopy,
    id: validationId,
    targets,
  });
}
