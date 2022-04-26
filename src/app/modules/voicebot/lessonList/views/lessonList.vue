<template>
  <v-row>
    <v-col cols="12">
      <base-card v-sys-loading="loading">
        <v-card-title>
          <div class="d-flex justify-space-between flex-wrap">
            <v-btn class="ma-2" dark color="primary" @click="createLesson()">
              <router-link
                :to="{
                  name: 'create-lesson',
                }"
                style="text-decoration: none; color: inherit"
              >
                <v-icon>mdi-plus</v-icon>
                {{ $t('buttons.voicebot.createLesson') }}
              </router-link>
            </v-btn>
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
          :items="lessonList"
          item-key="id"
          class="elevation-1 table-one"
          multi-sort
        >
          <template v-slot:[`item.lesson`]="{ item }">
            <div class="d-flex align-center">
              <!-- <v-avatar class="mr-2" size="26" dark>
                <img :src="item.img" alt="" />
              </v-avatar> -->
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
                    <router-link
                      :to="{
                        name: 'create-lesson',
                        query: { lessonName: item.lesson, categoryName: item.category, courseName: item.course },
                      }"
                    >
                      <v-icon>mdi-pencil-box-outline</v-icon>
                    </router-link>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="danger" dark v-bind="attrs" icon v-on="on" @click="showDeleteDialogConfirmation(item)">
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
                ACTIVE
              </v-chip>
            </template>
            <v-dialog
              v-model="dialogDelete"
              max-width="800px"
              :retain-focus="false"
              hide-overlay
              content-class="v-dialog-localvoice"
            >
              <v-card>
                <v-card-title class="text-h5">Jesteś pewny że chcesz usunąć tą lekcję?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirmation">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </base-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { router } from '~app/core/router';
import LessonSummaryModel from '../models/lessonSummary';
import { lessonActions } from '~app/modules/voicebot/lesson';
import { lessonListActions, lessonListGetters } from '../store';

export default Vue.extend({
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Table One',
  },
  data: () => ({
    dialogDelete: false,
    lessonToDelete: {} as LessonSummaryModel | Record<string, never>,
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
      lessonList: lessonListGetters.getLessonList,
    }),
  },
  created() {
    this.fetchlessonsList();
  },
  methods: {
    ...mapActions({
      fetchlessonsList: lessonListActions.fetchLessonsList,
      removeLesson: lessonListActions.removeLesson,
      cleanLesson: lessonActions.cleanLesson,
    }),
    deleteItemConfirmation() {
      this.dialogDelete = false;
      if (Object.keys(this.lessonToDelete).length > 0 && this.lessonToDelete.constructor !== Object)
        this.removeLesson(this.lessonToDelete);
      this.lessonToDelete = {};
    },
    closeDeleteDialog() {
      this.lessonToDelete = {};
      this.dialogDelete = false;
    },
    showDeleteDialogConfirmation(lesson: LessonSummaryModel) {
      console.log('lesson', lesson);
      this.lessonToDelete = lesson;
      this.dialogDelete = true;
    },
    createLesson() {
      this.cleanLesson();
      router.push({ name: 'create-lesson' });
    },
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
