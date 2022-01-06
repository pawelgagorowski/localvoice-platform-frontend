import { RegisteredApp } from '~app/modules/system/apps';

export interface Config {
  apiUrl: string;

  /**
   * If set, `apiServer` property from company configuration will be ignored
   * and `apiUrl` will NOT be changed
   */
  ignoreCompanyApiUrl?: boolean;

  /**
   * Root host of legacy web server (Webcrete).
   * Used for cross-origin token storage hub and redirection to login page.
   */
  legacyWebServer: string;

  /**
   * `logoFile` value returned from `/api/account/company/configuration`
   */
  companyLogo?: string;

  /**
   * `webServer` value returned from `/api/account/company/configuration`
   */
  iframeHost?: string;

  /**
   * Override `iframeHost` and use `legacyWebServer` instead.
   * Allows to set iframe base URL to local environment.
   */
  overrideIframeHost?: boolean;

  forceLang?: string;

  features?: Features;

  apps?: {
    [key in RegisteredApp]: string;
  };
}

export interface Features {
  voicebots: boolean;
  connectedApps: boolean;
  permissions: boolean;
}

export type FeatureName = keyof Features;
