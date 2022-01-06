<template>
  <div>
    <b-form-group label-cols-sm="4" :label="$t('Login')" label-align-sm="right" label-for="login">
      <b-form-input id="login" v-model="form.data.login" disabled></b-form-input>
    </b-form-group>

    <form-control-state :errors="form.errors.current" v-slot:default="{ state, message }">
      <b-form-group
        label-cols-sm="4"
        :label="$t('Old Password')"
        label-align-sm="right"
        label-for="current"
        label-class="required"
        :invalid-feedback="message"
      >
        <b-form-input
          id="current"
          type="password"
          autocomplete="current-password"
          v-model="form.data.current"
          :state="state"
        ></b-form-input>
      </b-form-group>
    </form-control-state>

    <form-control-state :errors="form.errors.password" v-slot:default="{ state, message }">
      <b-form-group
        label-cols-sm="4"
        :label="$t('New Password')"
        label-align-sm="right"
        label-for="new"
        label-class="required"
        :invalid-feedback="message"
      >
        <b-form-input
          id="new"
          type="password"
          autocomplete="new-password"
          v-model="form.data.password"
          :state="state"
        ></b-form-input>
      </b-form-group>
    </form-control-state>

    <form-control-state
      :errors="form.errors.confirm"
      :custom="{ matchWith: $t('Password must match') }"
      v-slot:default="{ state, message }"
    >
      <b-form-group
        class="mb-0"
        label-cols-sm="4"
        :label="$t('Confirm')"
        label-align-sm="right"
        label-for="confirm"
        label-class="required"
        :invalid-feedback="message"
      >
        <b-form-input
          id="confirm"
          type="password"
          autocomplete="new-password"
          v-model="form.data.confirm"
          :state="state"
        ></b-form-input>
      </b-form-group>
    </form-control-state>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FormControlState, FormGroup } from '~app/shared/form';
import { PasswordFormData } from './wrapper';

export default Vue.extend({
  components: {
    FormControlState,
  },
  props: {
    form: { type: Object as PropType<FormGroup<PasswordFormData>>, required: true },
  },
});
</script>
