<template>
  <form @submit.prevent="onSubmit">
    <div class="card b-a-0 shadow-sm">
      <sys-card-header :title="$t('Account preferences')" icon="fas fa-user-cog"></sys-card-header>

      <div class="card-body">
        <div class="row">
          <div class="col-md-7 offset-md-2 col-xl-6 offset-xl-2">
            <b-form-group label-cols-sm="4">
              <p v-t="'Control settings related to your account.'" class="form-control-plaintext"></p>
            </b-form-group>

            <form-control-state v-slot:default="{ invalid, message }" :errors="form.errors.language">
              <b-form-group
                :label="$t('Language')"
                label-for="language"
                label-cols-sm="4"
                label-align-sm="right"
                label-class="required"
                :invalid-feedback="message"
              >
                <v-select
                  v-model="form.data.language"
                  input-id="language"
                  :options="languages"
                  label="name"
                  :reduce="(option) => option.id"
                  :clearable="false"
                  :searchable="false"
                  :class="{ 'is-invalid': invalid }"
                ></v-select>
              </b-form-group>
            </form-control-state>

            <form-control-state v-slot:default="{ invalid, message }" :errors="form.errors.timezone">
              <b-form-group
                :label="$t('Timezone')"
                label-cols-sm="4"
                label-align-sm="right"
                label-class="pt-0"
                :invalid-feedback="message"
              >
                <b-form-radio v-model="form.data.forceTimezone" :value="false" class="mb-1">
                  {{ $t('Default Company Timezone') }}<br />
                  <strong>{{ form.data.companyTimezone }}</strong>
                </b-form-radio>
                <b-form-radio v-model="form.data.forceTimezone" :value="true">
                  {{ $t('Use Different Timezone') }}
                </b-form-radio>
                <v-select
                  v-if="form.data.forceTimezone"
                  ref="timezones"
                  v-model="form.data.timezone"
                  input-id="timezone"
                  :options="timezones"
                  class="mt-2"
                  :class="{ 'is-invalid': invalid }"
                ></v-select>
              </b-form-group>
            </form-control-state>

            <!-- <form-control-state :errors="form.errors.posPlant" v-slot:default="{ state, message }">
              <b-form-group
                v-feature="'userPosPlant'"
                label-cols-sm="4"
                :label="$t('POS Plant')"
                label-align-sm="right"
                label-for="posPlant"
                :invalid-feedback="message"
              >
                <plant-select id="posPlant" v-model="form.data.posPlant" :state="state" />
              </b-form-group>
            </form-control-state> -->

            <b-form-group label-cols-sm="4">
              <b-form-checkbox v-model="form.data.messengerAutoStart" class="form-control-plaintext">
                {{ $t('Automatically Run Messenger') }}
                <b-form-text v-t="popupBlockerMessage"></b-form-text>
              </b-form-checkbox>
            </b-form-group>
          </div>
        </div>
      </div>

      <div class="card-footer d-flex">
        <button type="submit" class="btn btn-sm btn-primary ml-auto">
          {{ $t('Save') }}
          <i class="fas fa-check ml-2"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { languages, listTimezones } from '~app/core/i18n';
import { i18n } from '~app/core/i18n/marker';
// import { PlantSelect } from '~app/modules/plant';
import { toModel } from '~app/shared';
import { FormControlState, FormGroup, required } from '~app/shared/form';
import { AuthUserPreferences, AuthUserPreferencesForm } from '../model';
import { authActions, authGetters } from '../store';

export default Vue.extend({
  components: {
    FormControlState,
    // PlantSelect,
  },
  data() {
    const form = new FormGroup<AuthUserPreferencesForm>({
      id: {},
      language: {
        validators: [required],
        default: 'en-US',
      },
      companyTimezone: {},
      forceTimezone: {
        default: false,
      },
      timezone: {},
      // posPlant: {},
      messengerAutoStart: {
        default: false,
      },
    });

    return {
      form,
      languages,
      timezones: [],
      popupBlockerMessage: i18n.t('To start messenger automatically you need to disable popup blocker for this site.'),
    };
  },

  computed: {
    ...mapGetters({
      preferences: authGetters.getUserPreferences,
    }),
  },

  watch: {
    'form.data': {
      deep: true,
      handler() {
        if (this.form.data.forceTimezone) {
          this.form.setValidators('timezone', [required]);
        } else {
          this.form.setValidators('timezone', []);
          this.form.patch({ timezone: null });
        }

        if (this.form.validated) {
          this.form.validate();
        }
      },
    },
  },

  created(): any {
    this.$loading.register();
    return Promise.all([listTimezones(), this.fetch()])
      .then(([timezones]) => {
        this.timezones = timezones.filter((t) => t !== this.preferences.companyTimezone);
        return this.form.reset(this.preferences);
      })
      .finally(() => this.$loading.resolve());
  },

  methods: {
    ...mapActions({
      fetch: authActions.fetchPreferences,
      save: authActions.savePreferences,
    }),

    onSubmit() {
      if (!this.form.validate()) {
        return;
      }

      this.$loading.register();
      this.save(toModel(AuthUserPreferences, this.form.data))
        .then(() => {
          this.form.reset(this.preferences);
          this.$toast.success(this.$t('User preferences successfully saved'));
        })
        .finally(() => {
          this.$loading.resolve();
        });
    },
  },
});
</script>
