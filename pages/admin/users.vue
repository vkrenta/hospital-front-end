<template>
  <div class="table-wrapper">
    <user-form v-show="userDialogOpened" @close="userDialogOpened = false" />
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
            >Всього користувачів <span>100</span></v-toolbar-title
          >
          <v-spacer />
          <v-btn
            rounded
            fab
            color="deep-purple lighten-2"
            dark
            @click="userDialogOpened = true"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import userForm from '../../components/admin/user-form.vue';
export default {
  components: { userForm },
  layout: 'admin',
  async fetch(ctx) {
    await ctx.store.dispatch('admin-hospitals/fetchHospitalNames');
    console.log(ctx.store.getters['admin-hospitals/getHospitalNames']);
  },
  data() {
    return {
      userDialogOpened: false,
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
