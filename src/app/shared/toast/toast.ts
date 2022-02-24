/* eslint-disable no-param-reassign */
import { PluginFunction } from 'vue';
import { SysToast } from './types';
import ToastComponent from './toast.vue';

const VARIANT_ICON: { [key: string]: string } = {
  success: 'fas fa-check-circle',
  info: 'fas fa-info-circle',
  warning: 'fas fa-exclamation-circle',
  danger: 'fas fa-times-circle',
};

export const SysToastFactory = (): SysToast => {
  const showToast = (message: string, options: { color: string }) => {
    const toastContainer = document.querySelector('#app');
    const mountNode = document.createElement('div');
    mountNode.id = 'toast-node';
    if (toastContainer) {
      toastContainer.appendChild(mountNode);

      new ToastComponent({
        propsData: {
          message,
          color: options.color,
        },
      }).$mount('#toast-node');
    }
  };

  return {
    success(message): void {
      showToast(message, { color: 'success' });
    },
    danger(message): void {
      showToast(message, { color: 'danger' });
    },
    info(message): void {
      showToast(message, { color: 'info' });
    },
    warning(message): void {
      showToast(message, { color: 'warning' });
    },
  };
};

export const SysToastPlugin: PluginFunction<void> = (Vue) => {
  Object.defineProperty(Vue.prototype, '$toast', {
    get() {
      return SysToastFactory();
    },
  });
};
