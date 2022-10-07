<template>
  <div>
    <v-sheet
      class="header-backup"
      :style="{
        background: layoutState.backgroundColor,
      }"
    ></v-sheet>
    <v-app-bar
      :color="layoutState.layoutMode"
      :dark="layoutState.isDarkMode"
      app
      class="px-sm text-left shadow-sm ma-4 rounded-lg"
      flat
      height="75"
    >
      <v-app-bar-nav-icon v-ripple="{ class: 'primary--text' }" @click="changeSidebarVisibility" />
      <v-btn v-if="!layoutState.isDarkMode" class="ml-4" icon @click="changeBackgroundMode">
        <v-icon>mdi-weather-night</v-icon>
      </v-btn>
      <v-btn v-else class="ml-4" icon @click="changeBackgroundMode">
        <v-icon color="warning">mdi-white-balance-sunny</v-icon>
      </v-btn>
      <v-spacer />
      <v-badge bordered overlap content="1" color="red" offset-x="22" offset-y="22">
        <v-btn icon @click="notificationDrawer = !notificationDrawer">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>

      <v-btn icon @click="searchDrawer = !searchDrawer">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-chip pill class="transparent rounded-pill py-6" @click="userDrawer = !userDrawer">
        Hi, Watson
        <v-avatar class="ml-2">
          <v-img src="@/assets/me.png"></v-img>
        </v-avatar>
      </v-chip>
    </v-app-bar>
    <!-- userDrawer -->
    <v-navigation-drawer v-model="userDrawer" fixed right height="100%" temporary floating width="350">
      <user-drawer>
        <template v-slot:userDrawerCloseButton>
          <v-btn icon color @click.stop="userDrawer = !userDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </user-drawer>

      <template v-slot:append>
        <div class="my-4 mx-4">
          <base-hover-button
            text="Logout"
            block
            bg-color="primary lighten-5 primary--text"
            icon-name="mdi-logout"
            @click.native="logoutUser"
          />
        </div>
      </template>
    </v-navigation-drawer>

    <!-- notificationDrawer  -->
    <v-navigation-drawer v-model="notificationDrawer" fixed right height="100%" temporary floating width="350">
      <notification-drawer>
        <template v-slot:notificationDrawerCloseButton>
          <v-btn icon color @click.stop="notificationDrawer = !notificationDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </notification-drawer>

      <template v-slot:append>
        <div class="my-4 mx-4">
          <base-hover-button text="View All Notifications" block bg-color="primary lighten-5 primary--text" />
        </div>
      </template>
    </v-navigation-drawer>
    <!-- searchDrawer -->
    <v-navigation-drawer v-model="searchDrawer" fixed right height="100%" temporary floating width="380">
      <search-drawer>
        <template v-slot:searchDrawerCloseButton>
          <v-btn icon color @click.stop="searchDrawer = !searchDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </search-drawer>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { layoutActions, layoutGetters } from '../store';

export default {
  name: 'VerticallAppBar',
  data() {
    return {
      userDrawer: false,
      notificationDrawer: false,
      searchDrawer: false,
    };
  },
  methods: {
    ...mapActions({
      changeBackgroundMode: layoutActions.changeBackgroundMode,
      changeSidebarVisibility: layoutActions.changeSidebarVisibility,
    }),

    logoutUser() {
      this.signOut();

      this.$router.push('/app/sessions/sign-in-two');
    },
  },
  computed: {
    ...mapGetters({
      layoutState: layoutGetters.getState,
    }),
  },
};
</script>

<style lang="scss">
.header-backup {
  display: block;
  width: 100%;
  height: 102px;
  position: fixed;
  top: 0;
  z-index: 5;
  left: 0;
}
.tippy-box[data-theme~='light'] {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.vnb {
  background: transparent !important;
  &__menu-options {
    margin-top: 3px !important;
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }
        &:hover {
          color: #0081ff;
          .vnb__menu-options__option__arrow {
            fill: #0081ff;
          }
        }

        &__icon {
          svg {
            fill: #0081ff !important;
          }
        }
      }
    }
  }

  &__sub-menu-options {
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }
        color: #000 !important;
        &:hover {
          color: #0081ff !important;
        }
      }
    }
  }
}

.vnb__collapse-button {
  &:focus {
    border: 1px solid none;
    outline: none;
  }
  &:after {
    content: '\F035C';
    font-size: 25px;
    font-weight: 600;
    font-family: 'Material Design Icons';
  }
  svg {
    display: none !important;
  }
}

.vnb__popup {
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll !important;
  .vnb__popup__top__close-button {
    &:focus {
      border: 1px solid none;
      outline: none;
    }
    top: 20px;
    right: -33px;
    svg {
      fill: #000 !important;
    }
  }
}
</style>
