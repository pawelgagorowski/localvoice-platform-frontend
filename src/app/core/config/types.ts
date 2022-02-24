export interface Config {
  apiUrl: string;
  environment: string;
  backendEnvironment: string;
  companyLogo?: string;
  features?: Features;
}

export interface Features {
  voicebots: boolean;
  connectedApps: boolean;
  permissions: boolean;
}

export type FeatureName = keyof Features;
