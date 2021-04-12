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
          <v-toolbar-title>Всього лікарень: <span>100</span></v-toolbar-title>
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
      :length="10"
    ></v-pagination>
  </div>
</template>

<script>
import hospitalForm from '../../components/admin/hospital-form.vue';
export default {
  components: { hospitalForm },
  layout: 'admin',

  async fetch(ctx) {
    try {
      await ctx.store.dispatch('admin-hospitals/fetchHospitals', {});
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
  },

  data() {
    return {
      selected: [],
      hospitalDialogOpened: false,
      headers: [
        { text: 'Hospital ID', value: 'id' },
        { text: 'City', value: 'city' },
        { text: 'Title', value: 'name' },
        { text: 'Address', value: 'address' },
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
