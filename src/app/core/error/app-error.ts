import { i18n } from '~app/core/i18n/marker';

export class AppError extends Error {
  readonly status: number | undefined = undefined;

  readonly name: string = i18n.t('Unknown Error');

  readonly message: string = i18n.t('An unknown error occurred, please refresh page and try again.');

  constructor(name?: string, message?: string, status?: number) {
    super(message);

    if (name) {
      this.name = name;
    }

    if (message) {
      this.message = message;
    }

    if (status) {
      this.status = status;
    }
  }
}
