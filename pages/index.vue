<template>
  <div class="login-card-container">
    <v-card class="login-card">
      <v-card-title>Вхід у систему</v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            color="deep-purple"
            required
            label="Логін"
            :rules="formRules"
          ></v-text-field>
          <v-text-field
            color="deep-purple"
            required
            label="Пароль"
            :rules="formRules"
          ></v-text-field>

          <div class="button-wrapper">
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
      password: ''
    };
  },

  methods: {
    submitForm() {
      this.$refs.form.validate();
    }
  }
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
  justify-content: flex-end;
  width: 100%;
}
</style>
