/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import { getStyle } from '../helpers';
import { SPINNER_BASE_SIZE, SPINNER_BASE_SIZE_REDUCED, SPINNER_SIZE_HOST_REDUCE_RATIO } from '../spinner';
import SysLoadingComponent from './loading.vue';
import { SYS_LOADING_MAIN, SysLoadingConfig, SysLoadingNamespace, SysLoadingStyle } from './types';

interface SysLoadingProps {
  visible: boolean;
  spinnerDiameter: number;
  fullscreen: boolean;
}

interface SysLoadingRef {
  componentRef: Vue & SysLoadingProps;
  style: SysLoadingStyle;
  target: HTMLElement;
  times: number;
}

export class LoadingService {
  private _context: { [key: string]: SysLoadingRef } = {};

  constructor() {
    this.create({
      name: SYS_LOADING_MAIN,
      style: SysLoadingStyle.FullScreen,
    });
  }

  create(config: SysLoadingConfig): SysLoadingNamespace {
    const cfg = new SysLoadingConfig(config);

    this.remove(cfg.name);

    this._context[cfg.name] = {
      times: 0,
      style: cfg.style,
      target: cfg.target as HTMLElement,
      componentRef: new SysLoadingComponent({
        el: document.createElement('div'),
      }),
    };

    return this._createNamespace(cfg.name);
  }

  register(name = SYS_LOADING_MAIN, times = 1): number {
    if (!this._context[name]) {
      throw Error(`No loader created with name '${name}'`);
    }

    const context = this._context[name];
    if (context.times === 0) {
      this._showLoader(context);
    }
    context.times += times < 1 ? 1 : times;

    return context.times;
  }

  resolve(name = SYS_LOADING_MAIN, times = 1): number {
    if (!this._context[name]) {
      throw Error(`No loader created with name '${name}'`);
    }

    const context = this._context[name];
    times = times < 1 ? 1 : times;
    if (context.times > 0) {
      times = context.times - times;
      context.times = times < 0 ? 0 : times;
    }

    if (context.times === 0) {
      this._hideLoader(context);
    }
    return context.times;
  }

  resolveAll(name = SYS_LOADING_MAIN): void {
    if (!this._context[name]) {
      throw Error(`No loader created with name '${name}'`);
    }

    const context = this._context[name];
    context.times = 0;
    this._hideLoader(context);
  }

  remove(name: string): void {
    if (!this._context[name]) {
      return;
    }

    const context = this._context[name];
    this._hideLoader(context).then(() => {
      const mask = context.componentRef.$el;
      mask && mask.parentNode && mask.parentNode.removeChild(mask);
      context.componentRef && context.componentRef.$destroy();
      this._context[name] = undefined;
      delete this._context[name];
    });
  }

  private _showLoader(context: SysLoadingRef) {
    Vue.nextTick(() => {
      const originalPosition = getStyle(context.target, 'position');
      if (originalPosition !== 'absolute' && originalPosition !== 'fixed') {
        context.target.classList.add('sys-loading-wrapper');
      }

      if (!context.target.contains(context.componentRef.$el)) {
        context.target.appendChild(context.componentRef.$el);
      }

      context.componentRef.fullscreen = context.style === SysLoadingStyle.FullScreen;
      const hostHeight = context.target.getBoundingClientRect().height;
      context.componentRef.spinnerDiameter =
        hostHeight > 10 && hostHeight <= SPINNER_BASE_SIZE
          ? Math.floor(hostHeight * SPINNER_SIZE_HOST_REDUCE_RATIO)
          : SPINNER_BASE_SIZE_REDUCED;
      context.componentRef.visible = true;
    });
  }

  private _hideLoader(context: SysLoadingRef): Promise<void> {
    return new Promise((resolve) => {
      context.componentRef.$once('after-leave', () => {
        context.target.classList.remove('sys-loading-wrapper');
        resolve();
      });
      context.componentRef.visible = false;
    });
  }

  private _createNamespace(name: string): SysLoadingNamespace {
    const context = this._context[name];

    return {
      get times(): number {
        return context.times;
      },
      register: (count?: number): number => this.register(name, count),
      resolve: (count?: number): number => this.resolve(name, count),
      resolveAll: () => this.resolveAll(name),
      remove: () => this.remove(name),
    };
  }
}

export const loadingService = new LoadingService();
