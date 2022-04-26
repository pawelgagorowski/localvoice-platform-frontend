/* eslint-disable no-unused-expressions */
import Vue from 'vue';

// theme Main scss
import '@/assets/scss/octavia-design-system/octavia-design-system.scss';
import './spinner/spinner.scss';
import './toast/toast.scss';

// import css
import '@/assets/css/custom.css';

// vendors
import(/* webpackChunkName: "base" */ './vendors').then((m) => Vue.use(m.VendorsPlugin));

// custom components
import(/* webpackChunkName: "version" */ './version').then((m) => Vue.use(m.AppVersionPlugin));
import(/* webpackChunkName: "sysdyne" */ './loading').then((m) => Vue.use(m.SysLoadingPlugin));
import(/* webpackChunkName: "sysdyne" */ './spinner').then((m) => Vue.use(m.SysSpinnerPlugin));
import(/* webpackChunkName: "base" */ './base').then((m) => Vue.use(m.BaseComponentsPlugin));
import(/* webpackChunkName: "base" */ './drawer').then((m) => Vue.use(m.DrawerComponentsPlugin));
import(/* webpackChunkName: "base" */ './fixedButton').then((m) => Vue.use(m.FixedButtonPlugin));
import(/* webpackChunkName: "facebook" */ './facebook').then((m) => Vue.use(m.FacebookSDKPlugin));
