/* eslint-disable no-param-reassign */
import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

export function getStyle(element: HTMLElement, styleName: keyof CSSStyleDeclaration) {
  if (isServer) return null;
  if (!element || !styleName) return null;

  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    if (document.defaultView) {
      const computed = document.defaultView.getComputedStyle(element, '');
      return element.style[styleName] || computed ? computed[styleName] : null;
    }
    return null;
  } catch (e) {
    return element.style[styleName];
  }
}
