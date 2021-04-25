<template>
  <div class="login-card-container">
    <v-card class="login-card">
      <v-card-title>Вхід у систему</v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            color="deep-purple"
            v-model="login"
            required
            label="Логін"
            :rules="formRules"
          ></v-text-field>
          <v-text-field
            color="deep-purple"
            v-model="password"
            required
            label="Пароль"
            :rules="formRules"
            type="password"
          ></v-text-field>

          <div class="button-wrapper">
            <nuxt-link to="/">Забули пароль?</nuxt-link>
            <v-btn type="submit" color="deep-purple lighten-2" dark>
              Увійти
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formRules: [v => !!v || 'Обовʼязкове поле!'],
      login: '',
      password: '',
    };
  },

  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          const user = await this.$userAxios.$post(
            '/api/users/getUserByCredentials',
            {
              login: this.login,
              password: this.password,
            }
          );
          localStorage.setItem('user', JSON.stringify(user));
          if (user.role === 'SUPERADMIN') this.$router.push('/admin/hospital');
          else this.$router.push('/hospital/patients');
          // this.$store.commit('user/setUser', user);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 20px;

  .login-card {
    width: 100%;
    max-width: 400px;
  }
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>
