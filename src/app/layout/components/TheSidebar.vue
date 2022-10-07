<template>
  <v-navigation-drawer
    v-model="layoutState.isSidebarVisible"
    color="dark"
    :dark="true"
    :expand-on-hover="layoutState.isSidebarMinimized"
    :mini-variant="layoutState.isSidebarMinimized"
    :disable-resize-watcher="false"
    :mobile-breakpoint="960"
    height="100%"
    class="shadow-sm rounded-tr-lg rounded-br-lg mySidebar"
    :floating="false"
    v-bind="$attrs"
    app
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      class="h-100 rtl-ps-none ps scroll"
      style="height: 100%"
    >
      <v-list dense nav dark>
        <v-list-item class="px-0">
          <!-- <v-list-item-avatar> -->
          <v-img contain src="@/assets/localvoice.png" height="600px" />
          <!-- </v-list-item-avatar> -->

          <v-list-item-title class="text-18 text-uppercase text-default">Localvoice</v-list-item-title>
          <v-scroll-x-transition>
            <v-btn icon @click.stop="changeSidebarSize">
              <v-tooltip v-if="!layoutState.isSidebarMinimized" right color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon dark v-bind="attrs" color v-on="on">mdi-circle-slice-8</v-icon>
                </template>
                <span>UnPin</span>
              </v-tooltip>
              <v-tooltip v-if="layoutState.isSidebarMinimized" right color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon dark v-bind="attrs" color v-on="on">mdi-circle-outline</v-icon>
                </template>
                <span>pin</span>
              </v-tooltip>
            </v-btn>
          </v-scroll-x-transition>
        </v-list-item>
      </v-list>
      <v-list dark class="py-0 mt-10">
        <template v-for="(item, i) in sidebarItems">
          <base-item-group v-if="item" :key="`group-${i}`" :item="item"> </base-item-group>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { navigationGetters } from '~app/navigation/store';
import { items } from '../../../data/navigation';
import { layoutGetters, layoutActions } from '../store';
import { LayoutMode } from '../types';

export default {
  data() {
    return {
      color: LayoutMode.DARK,
      dark: true,
      items,
      opacity: 0.4,
    };
  },
  computed: {
    ...mapGetters({
      layoutState: layoutGetters.getState,
      sidebarItems: navigationGetters.getOrderedSidebarItems,
    }),
  },
  methods: {
    ...mapActions({
      changeSidebarSize: layoutActions.changeSidebarSize,
    }),
  },
};
</script>

<style lang="scss">
.ps-container {
  position: inherit !important;
}
.app-admin-wrap-layout-1.sidebar-mini {
  .v-toolbar {
    left: 56px !important;
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
  }
  .v-main {
    padding: 75px 0px 12px 56px !important;
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    padding-bottom: 0px !important;
  }
  &.sidebar-close {
    .v-toolbar {
      left: 0px !important;
      transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    }
    .v-main {
      padding: 75px 0px 12px 0px !important;
      transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
      padding-bottom: 0px !important;
    }
  }
}
</style>
