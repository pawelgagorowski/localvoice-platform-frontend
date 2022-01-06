<template>
  <div class="app-version text--disabled">
    <strong>UI:</strong> v{{ frontend.version }}

    <template v-if="backend">
      <strong>API:</strong>
      v{{ backend.version }}
    </template>
  </div>
</template>

<script lang="ts">
import { api } from '~app/core/api';
import { version } from '../../../../package.json';

export interface VersionInfo {
  version: string;
}

export default {
  name: 'AppVersion',
  data(): { [key: string]: VersionInfo } {
    return {
      frontend: { version },
      backend: null,
    };
  },

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
};
</script>

<style lang="scss"></style>
