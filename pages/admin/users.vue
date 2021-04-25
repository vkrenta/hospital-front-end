<template>
  <div class="table-wrapper">
    <user-form v-show="userDialogOpened" @close="userDialogOpened = false" />
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      :page.sync="page"
      :items-per-page="limit"
      hide-default-footer
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:item.hospitalId="{ item }">
        <span>{{
          !!item.hospitalId
            ? `${item.hospitalId.id}, ${item.hospitalId.city}, ${item.hospitalId.title}`
            : ''
        }}</span>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            >Всього користувачів <span>{{ usersCount }}</span></v-toolbar-title
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
import userForm from '../../components/admin/user-form.vue';
export default {
  components: { userForm },
  layout: 'admin',
  async fetch(ctx) {
    await ctx.store.dispatch('admin-hospitals/fetchHospitalNames');
    console.log(ctx.store.getters['admin-hospitals/getHospitalNames']);
  },
  async asyncData(ctx) {
    const { count: usersCount } = await ctx.$userAxios.$get('/api/users/count');
    const users = await ctx.$userAxios.$get('/api/users?page=1');

    return {
      usersCount,
      users,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.usersCount / this.$config.pageLimit);
    },
  },
  data() {
    return {
      userDialogOpened: false,
      page: 1,
      headers: [
        { text: 'Логін', value: 'login' },
        { text: 'Роль', value: 'role' },
        { text: 'Дата реєстрації', value: 'createdAt' },
        { text: 'Лікарня', value: 'hospitalId' },
      ],
    };
  },
  methods: {
    async onPageChange() {
      this.users = await this.$userAxios.$get('/api/users?page=' + this.page);
    },
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
