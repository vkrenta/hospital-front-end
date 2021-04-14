<template>
  <div>
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
          <v-toolbar-title>Всього користувачів <span>100</span></v-toolbar-title>
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
  </div>
</template>

<script>
export default {
  layout: 'admin',
};
</script>
