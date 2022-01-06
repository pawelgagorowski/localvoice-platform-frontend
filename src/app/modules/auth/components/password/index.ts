import PasswordModal from './modal.vue';

export function showPasswordModal(force = false) {
  return new PasswordModal({
    el: document.createElement('div'),
    propsData: { force },
  });
}
