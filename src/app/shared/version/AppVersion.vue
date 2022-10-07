<template>
  <div class="app-version text--disabled">
    <strong>UI:</strong> v{{ frontend.version }}

    <template v-if="backend">
      <strong>API:</strong>
      v{{ backend }}
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { api } from '~app/core/api';
import { version } from '../../../../package.json';

export interface VersionInfo {
  version: string;
}

export default Vue.extend({
  name: 'AppVersion',
  data: () => ({
    frontend: { version },
    backend: {},
  }),

  created(): void {
    api
      .get<VersionInfo>('/api/version')
      .catch(() => null)
      .then((res) => {
        if (res && res.data) {
          this.backend = res.data;
        }
      });
  },
});
</script>

<style lang="scss"></style>
