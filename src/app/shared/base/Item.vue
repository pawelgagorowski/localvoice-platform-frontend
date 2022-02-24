<template>
  <v-list-item
    v-ripple="{ class: 'primary--text' }"
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="item.to"
    :active-class="` ${isDark ? ' grey--text text--lighten-5' : 'primary--text'}`"
    :height="48"
    class="text-18 pl-6"
    dark
  >
    <v-list-item-icon v-if="text" dark class="v-list-item__icon--text" v-text="computedText" />

    <v-list-item-icon v-else-if="item.icon" dark>
      <v-icon v-text="item.icon" />
    </v-list-item-icon>

    <v-list-item-content v-if="item.title || item.subtitle" class="pa-0 text-14" dark>
      <v-list-item-title dark class="ma-0 text-14" v-text="item.title" />

      <v-list-item-subtitle dark v-text="item.subtitle" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'BaseItem',

  // mixins: [Themeable],
  props: {
    item: {
      type: Object,
      default: () => ({
        href: undefined,
        icon: undefined,
        subtitle: undefined,
        title: undefined,
        to: undefined,
        dark: true,
      }),
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDark: true,
    };
  },

  computed: {
    computedText() {
      if (!this.item || !this.item.title) return '';

      let text = '';

      this.item.title.split(' ').forEach((val) => {
        text += val.substring(0, 1);
      });

      return text;
    },
    href() {
      return this.item.href || (!this.item.to ? '#' : undefined);
    },
  },
};
</script>
<style>
.mySidebar .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #fff !important;
}

.mySidebar .theme--light.v-icon {
  color: #fff !important;
}
</style>
