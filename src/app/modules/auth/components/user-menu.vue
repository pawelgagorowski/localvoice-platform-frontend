<template>
  <b-navbar-nav class="c-header-nav">
    <b-nav-item-dropdown class="c-header-nav-item" toggle-class="c-header-nav-link" right lazy>
      <template v-slot:button-content>
        <span class="d-lg-down-none mr-1">{{ user.name }}</span>
        <i class="icon fas fa-user-circle fa-fw fa-lg" />
      </template>

      <b-dropdown-item @click.prevent="messenger.open(user)">
        <i class="icon fas fa-envelope fa-fw" /> {{ $t('Messenger') }}
      </b-dropdown-item>
      <b-dropdown-item :href="onlineSupportLink" target="_blank">
        <i class="icon fas fa-headset fa-fw" /> {{ $t('Online Support') }}
      </b-dropdown-item>
      <b-dropdown-item v-if="$auth.hasAccess($permission.ACCOUNT_PREFERENCES)" :to="{ name: 'auth-user-preferences' }">
        <i class="icon fas fa-user-cog fa-fw" /> {{ $t('Preferences') }}
      </b-dropdown-item>
      <b-dropdown-item v-if="$auth.hasAccess($permission.ACCOUNT_PASSWORD_CHANGE)" @click.prevent="openPasswordModal">
        <i class="icon fas fa-key fa-fw" /> {{ $t('Change Password') }}
      </b-dropdown-item>
      <b-dropdown-item @click.prevent="logout">
        <i class="icon fas fa-sign-out-alt fa-fw" /> {{ $t('Sign Out') }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar-nav>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapGetters } from 'vuex';
// import { MessengerProvider } from '~app/modules/messenger';
import { AuthInjectKey, AuthService } from '../service/auth.service';
import { authGetters } from '../store';
import { showPasswordModal } from './password';

// eslint-disable-next-line no-underscore-dangle
const Vue_ = Vue as VueConstructor<Vue & { auth: AuthService }>;

export default Vue_.extend({
  inject: {
    auth: AuthInjectKey,
  },
  // data() {
  //   return {
  //     messenger: MessengerProvider(this.$i18n, this.$toast),
  //   };
  // },
  computed: {
    ...mapGetters({
      user: authGetters.getUser,
    }),
    onlineSupportLink(): string {
      const url =
        'https://secure.logmeinrescue.com/Customer/Download.aspx?' +
        'EntryID=185000112&name={0}&comment1={1}&comment3=&comment4={2}&comment5=';

      return url.replace('{0}', this.user.login).replace('{1}', 'Dispatch').replace('{2}', this.user.language);
    },
  },

  mounted() {
    if (this.user.forcePasswordChange) {
      showPasswordModal(true);
    }
  },

  methods: {
    openPasswordModal() {
      showPasswordModal();
    },

    logout() {
      this.auth.logout();
    },
  },
});
</script>
