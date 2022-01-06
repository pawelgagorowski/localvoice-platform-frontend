<template>
  <b-input-group>
    <b-input-group-prepend is-text>
      <i class="fas fa-search"></i>
    </b-input-group-prepend>
    <b-input
      :placeholder="$attrs.placeholder"
      trim
      debounce="250"
      :value="value"
      :autofocus="autofocus"
      @update="$emit('update', $event)"
      @keyup.esc="$emit('update', '')"
    ></b-input>
    <b-input-group-append>
      <b-button v-if="value" variant="outline-secondary" class="btn-icon" @click.prevent="$emit('update', '')">
        <i class="fas fa-times"></i>
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: String,
    },
    autofocus: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
