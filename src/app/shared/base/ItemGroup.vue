<template>
  <v-list-group
    v-model="listModel"
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    flat
    active-class="dark darken-1 white--text DUPA!!"
    class="pl-0"
    dark
  >
    <template v-slot:activator>
      <v-list-item-icon v-if="text" class="v-list-item__icon--text" dark v-text="computedText" />

      <v-list-item-content dark>
        <v-list-item-title dark class="text-14" v-text="item.title" />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in children">
      <base-item-sub-group v-if="child.children" :key="`sub-group-${i}`" dark :item="child" />

      <base-item v-else :key="`item-${i}`" :item="child" :text="false" />
    </template>
  </v-list-group>
</template>

<script>
// Utilities
// eslint-disable-next-line import/no-extraneous-dependencies
import kebabCase from 'lodash/kebabCase';

export default {
  name: 'BaseItemGroup',
  // mixins: [Themeable],

  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      default: () => ({
        avatar: undefined,
        group: undefined,
        title: undefined,
        subHeader: undefined,
        children: []
      })
    },
    subGroup: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listModel: 0,
      verticalSidebarDrawerColor: 'dark'
    };
  },

  computed: {
    children() {
      return this.item.children.map((item) => ({
        ...item,
        to: !item.to ? undefined : `/app/${this.item.group}/${item.to}`
      }));
    },
    computedText() {
      if (!this.item || !this.item.title) return '';

      let text = '';

      this.item.title.split(' ').forEach((val) => {
        text += val.substring(0, 1);
      });

      return text;
    },
    group() {
      return this.genGroup(this.item.children);
    }
  },

  methods: {
    genGroup(children) {
      return children
        .filter((item) => item.to)
        .map((item) => {
          const parent = item.group || this.item.group;
          let group = `${parent}/${kebabCase(item.to)}`;

          if (item.children) {
            group = `${group}|${this.genGroup(item.children)}`;
            console.log('child');
          }

          return group;
          // eslint-disable-next-line no-unreachable
          console.log(group);
        })
        .join('|');
    }
  }
};
</script>
