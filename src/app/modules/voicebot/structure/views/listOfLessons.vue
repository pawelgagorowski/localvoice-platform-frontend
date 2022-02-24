<template>
  <v-row>
    <v-col cols="12">
      <base-card v-sys-loading="loading">
        <v-card-title>
          <div class="d-flex justify-space-between flex-wrap">
            <v-btn class="ma-2" dark color="danger">
              <v-icon>mdi-plus</v-icon>
              Create lesson
            </v-btn>
            <div>
              <v-btn class="ma-2" color="primary"> <v-icon>mdi-plus</v-icon>Create course </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-title>
          Customers
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />

          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
        </v-card-title>
        <v-data-table
          v-model="selected"
          :search="search"
          :headers="headers"
          :items="lessonsList"
          item-key="id"
          class="elevation-1 table-one"
          multi-sort
        >
          <template v-slot:[`item.lesson`]="{ item }">
            <div class="d-flex align-center">
              <v-avatar class="mr-2" size="26" dark>
                <img :src="item.img" alt="" />
              </v-avatar>
              <p class="ma-0 font-weight-medium">
                {{ item.lesson }}
              </p>
            </div>
          </template>
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template v-slot:[`item.action`]="{ item }">
            <div class="d-flex">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="success" dark v-bind="attrs" icon v-on="on">
                    <v-icon>mdi-pencil-box-outline</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="danger" dark v-bind="attrs" icon v-on="on">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </div>
          </template>
          <template v-slot:[`item.badge`]="{ item }">
            <template v-if="item.badge === 'Active'">
              <v-chip class="" color="success" label small text-color="white">
                <v-icon small left> mdi-check </v-icon>
                {{ item.badge }}
              </v-chip>
            </template>
            <template v-else>
              <v-chip class="" color="danger" label small text-color="white">
                <v-icon small left> mdi-close </v-icon>
                {{ item.badge }}
              </v-chip>
            </template>
          </template>
        </v-data-table>
      </base-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { voicebotActions, voicebotGetters } from '../store';

export default Vue.extend({
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Table One',
  },
  data: () => ({
    search: '',
    selected: [],
    loading: false,
    headers: [
      {
        text: 'Lesson',
        align: 'start',
        value: 'lesson',
      },
      { text: 'Category', value: 'category' },
      { text: 'Course', value: 'course' },
      { text: 'Status', value: 'badge' },
      { text: 'Action', value: 'action' },
    ],
  }),
  computed: {
    ...mapGetters({
      lessonsList: voicebotGetters.getLessonsList,
    }),
  },
  created() {
    this.fetchlessonsList();
  },
  methods: {
    ...mapActions({
      fetchlessonsList: voicebotActions.fetchLessonsList,
    }),
  },
});
</script>

<style lang="scss" scoped>
::v-deep .theme--light .table-one {
  thead.v-data-table-header {
    tr {
      &:hover {
        background-color: #f2f3f8;
      }
      th {
        span {
          font-size: 16px;
          color: #304156;
        }
      }
    }
    tr {
      td {
        padding-bottom: 20px;
        padding-top: 20px;
      }
    }
  }
  tbody {
    tr {
      &:hover {
        background-color: #f2f3f8 !important;
      }
    }
  }
}
::v-deep .theme--dark .table-one {
  thead.v-data-table-header {
    tr {
      &:hover {
        background-color: #f2f3f8;
      }
      th {
        span {
          font-size: 16px;
          color: #304156;
        }
      }
    }
    tr {
      td {
        padding-bottom: 20px;
        padding-top: 20px;
      }
    }
  }
  tbody {
    tr {
      td {
        color: #fff;
        &:hover {
          color: #f2f3f8 !important;
        }
      }
    }
  }
}
</style>
