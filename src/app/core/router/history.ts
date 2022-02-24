import VueRouter, { RawLocation, Route } from 'vue-router';
import { PluginFunction } from 'vue';

export interface RouterHistoryConfig {
  maxLength?: number;
}

export class RouterHistory {
  private history: string[] = [];

  private markers: { [key: string]: string } = {};

  private maxLength = 10;

  get length(): number {
    return this.history.length;
  }

  get steps(): string[] {
    return [...this.history];
  }

  constructor(private router: VueRouter, config?: RouterHistoryConfig) {
    if (config && config.maxLength && config.maxLength > 0) {
      this.maxLength = config.maxLength;
    }

    router.afterEach((to) => {
      if (to && to.meta) this.addStep(to.fullPath, to.meta.historyMarker || to.name);
    });
  }

  addStep(url: string, marker?: string): RouterHistory {
    this.history = [...this.history, url];

    if (this.history.length > this.maxLength) {
      this.history.shift();
    }

    if (marker) {
      this.setMarker(marker);
    }

    return this;
  }

  getStep(offset: number): string {
    if (offset > 0) {
      throw Error('Offset must be <= 0');
    }
    const finalOffset = this.history.length + offset - 1;
    return this.history[finalOffset];
  }

  hasStep(offset: number): boolean {
    if (offset > 0) {
      throw Error('Offset must be <= 0');
    }

    const finalOffset = this.history.length + offset - 1;
    return !!this.history[finalOffset];
  }

  navigateToStep(offset: number, fallback?: RawLocation): Promise<Route> {
    if (this.hasStep(offset)) {
      return this.router.push(this.getStep(offset));
    }

    return this.router.push(fallback || '/');
  }

  setMarker(marker: string, offset = 0): RouterHistory {
    if (this.hasStep(offset)) {
      this.markers[marker] = this.getStep(offset);
    }

    return this;
  }

  navigateToMarker(marker: string, fallback?: RawLocation): Promise<Route> {
    if (this.hasMarker(marker)) {
      return this.router.push(this.getMarker(marker));
    }

    if (!fallback) {
      // eslint-disable-next-line no-param-reassign
      fallback = this.router.resolve({ name: marker })?.location;
    }

    return this.router.push(fallback || '/');
  }

  getMarker(marker: string): string {
    return this.markers[marker];
  }

  hasMarker(marker: string): boolean {
    return !!this.markers[marker];
  }

  clear(): RouterHistory {
    this.history = [];
    this.markers = {};

    return this;
  }
}

export const RouterHistoryPlugin: (router: VueRouter) => PluginFunction<RouterHistoryConfig> = (router) => (
  Vue,
  options?
) => {
  const history = new RouterHistory(router, options);

  Object.defineProperty(Vue.prototype, '$history', {
    get() {
      return history;
    },
  });
};
