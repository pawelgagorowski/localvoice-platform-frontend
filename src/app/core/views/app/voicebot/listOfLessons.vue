<template>
  <v-row>
    <v-col cols="12">
      <base-card>
        <v-card-title>
          <div class="d-flex justify-space-between flex-wrap">
            <v-btn class="ma-2" dark color="danger">
              <v-icon>mdi-plus</v-icon>
              Add Customer
            </v-btn>
            <div>
              <v-btn class="ma-2" color="primary">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
              <v-btn outlined class="ma-2"> Import </v-btn>
              <v-btn outlined class="ma-2"> Export </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-title>
          Customers
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />

          <v-text-field v-model="search" append-icon="mdi-magnify" label="Searcheeee" single-line hide-details />
        </v-card-title>
        <v-data-table
          v-model="selected"
          :search="search"
          :headers="headers"
          :items="desserts"
          item-key="name"
          show-select
          class="elevation-1 table-one"
          multi-sort
        >
          <template v-slot:[`item.name`]="{ item }">
            <div class="d-flex align-center">
              <v-avatar class="mr-2" size="26" dark>
                <img :src="item.img" alt="" />
              </v-avatar>
              <p class="ma-0 font-weight-medium">
                {{ item.name }}
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

<script>
export default {
  /* eslint-disable global-require */
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Table One',
  },
  data() {
    return {
      search: '',
      selected: [],
      headers: [
        {
          text: 'Customer',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Store Name', value: 'calories' },
        { text: 'Products', value: 'fat' },
        { text: 'Wallet Balance', value: 'carbs' },
        { text: 'Create Date', value: 'protein' },
        { text: 'Status', value: 'badge' },
        { text: 'Action', value: 'action' },
      ],
      desserts: [
        {
          img: require('@/assets/images/avatars/001-man.svg'),
          name: 'Jhon Doe',
          calories: 'Walmart',
          fat: '95',
          carbs: '$14,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/002-woman.svg'),
          name: 'Elizabeth Doe',
          calories: 'KFC',
          fat: '876',
          carbs: '$38,384',
          protein: '03/24/2020',
          badge: 'Deactive',
        },
        {
          img: require('@/assets/images/avatars/003-man-1.svg'),
          name: 'Jhon Legend',
          calories: 'Starbucks',
          fat: '300',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/004-bald.svg'),
          name: 'Juggernaut',
          calories: 'Apple',
          fat: '700',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Deactive',
        },
        {
          img: require('@/assets/images/avatars/007-woman-2.svg'),
          name: 'Medusa',
          calories: 'Apple',
          fat: '700',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/001-man.svg'),
          name: 'Jhon Doe two',
          calories: 'Walmart',
          fat: '95',
          carbs: '$14,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/002-woman.svg'),
          name: 'Elizabeth Doe two',
          calories: 'KFC',
          fat: '876',
          carbs: '$38,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/003-man-1.svg'),
          name: 'Jhon Legend two',
          calories: 'Starbucks',
          fat: '300',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/004-bald.svg'),
          name: 'Juggernaut two',
          calories: 'Apple',
          fat: '700',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Deactive',
        },
        {
          img: require('@/assets/images/avatars/007-woman-2.svg'),
          name: 'Medusa two',
          calories: 'Apple',
          fat: '700',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/002-woman.svg'),
          name: 'Elizabeth Doe three',
          calories: 'KFC',
          fat: '876',
          carbs: '$38,384',
          protein: '03/24/2020',
          badge: 'Deactive',
        },
        {
          img: require('@/assets/images/avatars/003-man-1.svg'),
          name: 'Jhon Legend three',
          calories: 'Starbucks',
          fat: '300',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Deactive',
        },
        {
          img: require('@/assets/images/avatars/004-bald.svg'),
          name: 'Juggernaut three',
          calories: 'Apple',
          fat: '700',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/007-woman-2.svg'),
          name: 'Medusa three',
          calories: 'Apple',
          fat: '700',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Deactive',
        },
        {
          img: require('@/assets/images/avatars/001-man.svg'),
          name: 'Jhon Doe four',
          calories: 'Walmart',
          fat: '95',
          carbs: '$14,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
        {
          img: require('@/assets/images/avatars/002-woman.svg'),
          name: 'Elizabeth Doe four',
          calories: 'KFC',
          fat: '876',
          carbs: '$38,384',
          protein: '03/24/2020',
          badge: 'Deactive',
        },
        {
          img: require('@/assets/images/avatars/003-man-1.svg'),
          name: 'Jhon Legend four',
          calories: 'Starbucks',
          fat: '300',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Deactive',
        },
        {
          img: require('@/assets/images/avatars/004-bald.svg'),
          name: 'Juggernaut four',
          calories: 'Apple',
          fat: '700',
          carbs: '$78,384',
          protein: '03/24/2020',
          badge: 'Active',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .table-one {
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
</style>
