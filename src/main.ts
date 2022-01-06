/* istanbul ignore file */
import 'focus-visible';
import 'reflect-metadata';
import Vue from 'vue';

Vue.config.productionTip = false;

let timer = Date.now();
import(/* webpackChunkName: "core" */ './app/core')
  .then(({ bootstrap }) => bootstrap('#app'))
  .then(() => {
    const splash: HTMLElement = document.querySelector('#splash');
    splash.addEventListener('transitionend', () => {
      splash.parentElement.removeChild(splash);
    });
    // // show splash screen for at least 500ms (remove if you don't like this behavior)
    timer = 1000 - (Date.now() - timer);
    setTimeout(() => splash.classList.add('hide'), timer >= 0 ? timer : 0);
  });
