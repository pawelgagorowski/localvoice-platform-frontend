// https://github.com/angular/components/blob/master/src/cdk/platform/platform.ts
import Vue from 'vue';

let hasV8BreakIterator: boolean;
try {
  hasV8BreakIterator = typeof Intl !== 'undefined' && (Intl as any).v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}

export function isBrowser(): boolean {
  return !Vue.prototype.$isServer;
}

export class Platform {
  isBrowser = isBrowser();

  EDGE: boolean = this.isBrowser && /(edge)/i.test(navigator.userAgent);

  TRIDENT: boolean = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);

  BLINK: boolean =
    this.isBrowser &&
    !!((window as any).chrome || hasV8BreakIterator) &&
    typeof CSS !== 'undefined' &&
    !this.EDGE &&
    !this.TRIDENT;

  WEBKIT: boolean =
    this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;

  IOS: boolean = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);

  FIREFOX: boolean = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);

  ANDROID: boolean = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;

  SAFARI: boolean = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
}

export const platform = new Platform();

export const DOCUMENT = window.document;
