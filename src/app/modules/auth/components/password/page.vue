<template>
  <div class="row">
    <div class="col-sm-10 col-md-9 col-lg-7 col-xl-6">
      <password-form-wrapper v-slot="{ form }" autocomplete="off" novalidate>
        <div class="card b-a-0 shadow-sm">
          <sys-card-header :title="$t('Change Password')" icon="fas fa-unlock-alt"></sys-card-header>

          <div class="card-body">
            <password-form :form="form"></password-form>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-8 offset-sm-4">
                <button type="submit" class="btn btn-sm btn-primary">
                  <i class="fa fa-check"></i>
                  {{ $t('Update') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </password-form-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PasswordForm from './form.vue';
import PasswordFormWrapper from './wrapper';

export default Vue.extend({
  components: {
    PasswordFormWrapper,
    PasswordForm,
  },
});
</script>
