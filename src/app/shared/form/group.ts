/* eslint-disable import/no-cycle */
import { coerceArray, hasOwn, objectKeys } from '../helpers';
import { defaultMessages, ValidationError, ValidatorFn } from './validators';

export interface FormFieldConfig {
  validators?: ValidatorFn[];
  default?: any;
}

export type FormGroupConfig<T> = { [key in keyof T]: FormFieldConfig };
export type FormGroupValidators<T> = { [key in keyof T]?: ValidatorFn[] };
export type FormGroupErrors<T> = { [key in keyof T]?: ValidationError[] | null };

// TODO generic form group composition
export class FormGroup<T> {
  data: T = {} as T;

  validators: FormGroupValidators<T> = {};

  validated = false;

  errors: FormGroupErrors<T> = {};

  isAnyError = false;

  get valid(): boolean {
    return !objectKeys(this.errors).some((key) => this.errors[key] !== null);
  }

  constructor(private config: FormGroupConfig<T>) {
    objectKeys(config).forEach((key) => {
      const def = config[key];
      this.data[key] = def.default;
      this.validators[key] = def.validators || [];
      this.errors[key] = null;
    });
  }

  validate(): boolean {
    objectKeys(this.validators).forEach((key) => {
      const validators = this.validators[key];
      const res: ValidationError[] = [];
      if (validators && validators?.length > 0) {
        validators.forEach((fn: ValidatorFn) => {
          const error = fn(this.data[key], this.data);
          if (error) {
            this.isAnyError = true;
            error.message = defaultMessages[error.type];
            res.push(error);
          } else this.isAnyError = false;
        });
      }

      this.errors[key] = res.length ? res : null;
    });

    this.validated = true;

    return this.valid;
  }

  setValidators(field: keyof T, validators: ValidatorFn[]) {
    if (hasOwn(this.validators, field)) {
      this.validators[field] = validators;
    }
  }

  clearValidators(field: keyof T) {
    if (hasOwn(this.validators, field)) {
      this.validators[field] = [];
    }
  }

  patch(data: Partial<T>) {
    objectKeys(data).forEach((key) => {
      if (hasOwn(this.data, key)) {
        this.data[key] = data[key] as T[keyof T];
      }
    });
  }

  reset(data?: Partial<T>) {
    this.validated = false;
    objectKeys(this.data).forEach((key) => {
      if (!data || hasOwn(data, key)) {
        this.data[key] = data && data[key] !== undefined ? data[key] : this.config[key].default;
      }
      this.errors[key] = null;
    });
  }

  clearErrors(data?: Partial<T>) {
    this.validated = false;
    objectKeys(this.data).forEach((key) => {
      this.errors[key] = null;
    });
  }

  setCustomError(key: keyof T, message: string) {
    if (hasOwn(this.errors, key)) {
      this.errors[key] = [{ type: 'custom', message } as ValidationError];
    }
  }

  setServerErrors(errors: FormGroupErrors<T>) {
    objectKeys(errors).forEach((key) => {
      if (hasOwn(this.errors, key)) {
        this.errors[key] = coerceArray(errors[key] as ValidationError[]).map((err) => ({
          type: err.type,
          message: defaultMessages[err.type],
          args: err.args,
        }));
      }
    });
  }
}
