<template>
  <b-card v-sys-loading="loading" no-body class="b-a-0 shadow-sm">
    <sys-card-header :title="$t('Connected Apps')" icon="fas fa-project-diagram"></sys-card-header>

    <b-card-body>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
        <div v-for="app in apps" :key="app.name" class="col">
          <b-card no-body>
            <img :src="`${publicPath}images/app-${app.name}.png`" :alt="app.name" class="card-img-top" />
            <b-card-body class="text-center">
              <b-button v-if="!app.isActive" v-t="'Connect'" variant="primary" @click="connect(app)"></b-button>
              <b-button v-else v-t="'Disconnect'" variant="danger" @click="disconnect(app)"></b-button>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </b-card-body>

    <form v-if="app" ref="form" method="post" :action="app.connectUrl">
      <input type="hidden" name="id" :value="app.appId" />
      <input type="hidden" name="secret" :value="app.secret" />
      <input type="hidden" name="companyId" :value="app.companyId" />
      <input type="hidden" name="activateUrl" :value="activateUrl" />
    </form>

    <form v-if="app" ref="disconnectForm" method="post" :action="app.disconnectUrl">
      <input type="hidden" name="id" :value="app.appId" />
      <input type="hidden" name="redirectUri" :value="deactivateUrl" />
    </form>
  </b-card>
</template>

<script lang="ts">
/* eslint-disable no-return-assign */
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { AppRouteName } from '../routes';
import { appStoreAction, AppStoreAction, appStoreGetter, AppStoreGetter } from '../store';
import { AppModel } from '../types';

export default Vue.extend({
  name: 'AppsList',
  components: {},
  props: {},
  data(): { publicPath: string; loading: boolean; app?: AppModel } {
    return {
      publicPath: process.env.BASE_URL,
      loading: false,
      app: undefined,
    };
  },
  computed: {
    ...mapGetters({
      apps: appStoreGetter(AppStoreGetter.BY_NAME),
    }),
    activateUrl(): string {
      const { href } = this.$router.resolve({
        name: AppRouteName.LIST,
        query: { connect: this.app?.appId },
      });

      return `${window.location.origin}${href}`;
    },
    deactivateUrl(): string {
      const { href } = this.$router.resolve({
        name: AppRouteName.LIST,
        query: { disconnect: this.app?.appId },
      });

      return `${window.location.origin}${href}`;
    },
  },
  created(): any {
    this.loading = true;
    return this.$store
      .dispatch(appStoreAction(AppStoreAction.LOAD))
      .then((): any => {
        if (this.$route.query.connect && this.$route.query.webhook) {
          return this.activate(this.$route.query.connect as string, this.$route.query.webhook as string);
        }
        if (this.$route.query.disconnect) {
          return this.deactivate(this.$route.query.disconnect as string);
        }
        return null;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    connect(app: AppModel) {
      this.loading = true;
      return this.$store
        .dispatch(appStoreAction(AppStoreAction.CONNECT), app)
        .then(() => {
          this.app = this.apps[app.name];
          Vue.nextTick(() => (this.$refs.form as HTMLFormElement).submit());
        })
        .finally(() => (this.loading = false));
    },
    activate(appId: string, webhook: string) {
      return this.$store
        .dispatch(appStoreAction(AppStoreAction.ACTIVATE), { appId, webhook })
        .then(() => this.$toast.success(this.$t('App connected successfully')))
        .finally(() => this.$router.replace({ name: AppRouteName.LIST, query: {} }));
    },
    disconnect(app: AppModel) {
      return this.$modal
        .msgBoxConfirm(this.$t('Are you sure you want to disconnect {name} app?', app), {
          size: 'sm',
          okVariant: 'danger',
        })
        .then((v: boolean) => {
          if (!v) {
            return;
          }

          this.app = app;
          Vue.nextTick(() => (this.$refs.disconnectForm as HTMLFormElement).submit());
        });
    },
    deactivate(appId: string) {
      return this.$store
        .dispatch(appStoreAction(AppStoreAction.DISCONNECT), { appId })
        .then(() => this.$toast.success(this.$t('App disconnected successfully')))
        .then(() => (this.app = undefined))
        .finally(() => this.$router.replace({ name: AppRouteName.LIST, query: {} }));
    },
  },
});
</script>

<style lang="scss" scoped></style>
