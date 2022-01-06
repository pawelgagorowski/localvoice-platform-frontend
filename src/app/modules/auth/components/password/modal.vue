<template>
  <b-modal
    id="auth-password-modal"
    ref="modal"
    modal-class="vnext"
    :title="$t('Change Password')"
    :no-close-on-backdrop="force"
    :no-close-on-esc="force"
    :hide-header-close="force"
    @hide="reset"
    @ok="onSubmit"
  >
    <password-form-wrapper v-slot="{ form }" ref="form" autocomplete="off" novalidate @success="onSuccess">
      <b-alert v-t="'Your password has expired and must be changed.'" variant="info" :show="force"></b-alert>

      <password-form :form="form"></password-form>

      <button type="submit" class="d-none"></button>
    </password-form-wrapper>

    <template v-slot:modal-footer="{ ok, close }">
      <button v-if="!force" v-t="'Close'" type="button" class="btn btn-sm btn-secondary" @click="close"></button>
      <button type="submit" class="btn btn-sm btn-primary" @click="ok">
        <i class="fa fa-check"></i>
        {{ $t('Update') }}
      </button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { BModal } from 'bootstrap-vue/src';
import Vue from 'vue';
import { i18n } from '~app/core/i18n';
import { store } from '~app/core/store';
import PasswordForm from './form.vue';
import PasswordFormWrapper, { VPasswordFormWrapper } from './wrapper';

export default Vue.extend({
  i18n,
  store,
  components: {
    PasswordFormWrapper,
    PasswordForm,
  },
  props: {
    force: { type: Boolean, default: false },
  },
  computed: {
    modal(): BModal {
      return this.$refs.modal as BModal;
    },
    form(): VPasswordFormWrapper {
      return this.$refs.form as VPasswordFormWrapper;
    },
  },
  mounted() {
    this.modal.show();
  },
  methods: {
    onSubmit(e: Event) {
      e.preventDefault();
      this.form.onSubmit();
    },

    reset(e: Event) {
      if (!e.defaultPrevented) {
        this.form.reset();
      }
    },

    onSuccess() {
      this.modal.hide();
    },
  },
});
</script>
