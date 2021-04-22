<template>
  <div class="table-wrapper">
    <hospital-form
      v-show="hospitalDialogOpened"
      @close="hospitalDialogOpened = false"
    />

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="limit"
      hide-default-footer
      item-key="id"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            >Всього лікарень: <span>{{ hospitalsCount }}</span></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn
            rounded
            fab
            color="deep-purple lighten-2"
            dark
            @click="hospitalDialogOpened = true"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-pagination
      class="mt-5"
      @input="onPageChange"
      v-model="page"
      color="deep-purple lighten-2"
      circle
      :length="pages"
    />
  </div>
</template>

<script>
import hospitalForm from '../../components/admin/hospital-form.vue';
export default {
  components: { hospitalForm },
  layout: 'admin',

  async fetch(ctx) {
    try {
      await Promise.all([
        ctx.store.dispatch('admin-hospitals/fetchHospitals', {}),
        ctx.store.dispatch('admin-hospitals/fetchHospitalsCount'),
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async onPageChange() {
      try {
        await this.$store.dispatch('admin-hospitals/fetchHospitals', {
          page: this.page,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    items() {
      return this.$store.getters['admin-hospitals/getHospitals'];
    },

    hospitalsCount() {
      return this.$store.getters['admin-hospitals/getHospitalsCount'];
    },

    pages() {
      return Math.ceil(this.hospitalsCount / this.$config.pageLimit);
    },
  },

  data() {
    return {
      selected: [],
      hospitalDialogOpened: false,
      headers: [
        { text: 'Код лікарні', value: 'id' },
        { text: 'Населений пункт', value: 'city' },
        { text: 'Назва', value: 'name' },
        { text: 'Адреса', value: 'address' },
      ],
      limit: 10,
      offset: 0,
      page: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  width: 100%;
  max-width: 1000px;
}
</style>
