import { AxiosError } from 'axios';
import Vue from 'vue';
import { AppError } from './app-error';

function isHttpError(error: any): boolean {
  return error?.isAxiosError;
}

function convertHttpError(error: AxiosError): AppError {
  const { response } = error;

  if (!response) {
    return new AppError(error.message, `${error.config.method!.toUpperCase()} ${error.config.url}`);
  }

  const data = response.data || {};

  const name = `HTTP ${response.status} ${response.statusText}`;
  let message = data.message || data.title;
  if (!message) {
    message = `${name}: ${response.config.url}`;
  }
  if (data.errors) {
    message += `<pre class="small">${JSON.stringify(data.errors, null, 2)}</pre>`;
  }

  return new AppError(name, message, response.status);
}

export function errorHandler(error: Error, vm: Vue): void {
  let appError: AppError;
  if (isHttpError(error)) {
    appError = convertHttpError(error as AxiosError);
  } else {
    appError = new AppError(error.name, error.message);
  }
  // TODO
  // missing part of code
  vm.$loading.resolveAll();
  console.error(error); // eslint-disable-line no-console
}
