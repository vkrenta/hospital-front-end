<template>
  <v-app>
    <v-app-bar app>
      <nuxt-link class="no-outline" to="/admin">
        <v-btn text rounded fab>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </nuxt-link>

      <v-spacer />

      <nuxt-link class="no-outline" to="/admin">
        <v-btn text>
          Головна
        </v-btn>
      </nuxt-link>
      <nuxt-link class="no-outline" to="/admin/hospital">
        <v-btn text>
          Лікарні
        </v-btn>
      </nuxt-link>
      <nuxt-link class="no-outline" to="/admin/stats">
        <v-btn text>
          Статистика
        </v-btn>
      </nuxt-link>

      <v-spacer />
    </v-app-bar>

    <v-main>
      <div class="main-content">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.no-outline {
  text-decoration: none;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
