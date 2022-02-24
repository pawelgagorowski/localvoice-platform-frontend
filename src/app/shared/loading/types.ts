/* eslint-disable no-shadow */
export const SYS_LOADING_MAIN = 'sys-loading-main';

export enum SysLoadingStyle {
  FullScreen = 'fullscreen',
  Overlay = 'overlay',
}

export class SysLoadingConfig {
  name: string;

  style?: SysLoadingStyle;

  target?: null | HTMLElement;

  constructor(config: SysLoadingConfig) {
    this.name = config.name;
    if (!this.name) {
      throw Error('Name is required for SysLoading configuration');
    }
    this.style = config.style ? config.style : SysLoadingStyle.Overlay;

    let { target } = config;
    if (target && typeof target === 'string') {
      target = document.querySelector<HTMLElement>(target);
    }
    this.target = target || document.body;
  }
}

export interface SysLoadingNamespace {
  readonly times: number;
  register(count?: number): number;
  resolve(count?: number): number;
  resolveAll(): void;
  remove(): void;
}
