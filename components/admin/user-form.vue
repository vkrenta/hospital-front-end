<template>
  <div class="dialog-overlay">
    <v-form ref="form" class="dialog-wrapper" @submit.prevent="onSave">
      <div class="hospital-form-container">
        <div class="title-text subtitle-1">Логін</div>
        <v-text-field
          outlined
          color="deep-purple"
          required
          :rules="[v => !!v || 'Обов\'язкове поле']"
          v-model="login"
        ></v-text-field>
        <div class="title-text subtitle-1">Пароль</div>
        <v-text-field
          outlined
          color="deep-purple"
          required
          :rules="[v => !!v || 'Обов\'язкове поле']"
          v-model="password"
        ></v-text-field>
        <div class="title-text subtitle-1">Імʼя</div>
        <v-text-field
          outlined
          color="deep-purple"
          required
          :rules="[v => !!v || 'Обов\'язкове поле']"
          v-model="name"
        ></v-text-field>
        <div class="title-text subtitle-1">Роль</div>
        <v-autocomplete
          v-model="role"
          outlined
          color="deep-purple"
          required
          :rules="[v => !!v || 'Обов\'язкове поле']"
          :items="userRoles"
          auto-select-first
        ></v-autocomplete>
        <div class="title-text subtitle-1">Лікарня</div>
        <v-autocomplete
          v-model="selectedHospital"
          item-text="text"
          item-value="hospitalId"
          outlined
          color="deep-purple"
          required
          :disabled="role !== 'HOSPITAL_ADMIN'"
          :rules="[
            v => !!v || role !== 'HOSPITAL_ADMIN' || 'Обов\'язкове поле',
          ]"
          :items="hospitalNames"
          auto-select-first
        ></v-autocomplete>
      </div>

      <div class="dialog-buttons">
        <v-btn @click="onClose">Відміна</v-btn>
        <v-btn type="submit" color="deep-purple lighten-2" dark>Зберегти</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { cities } from '~/helpers/cities';
export default {
  data() {
    return {
      userRoles: ['SUPERADMIN', 'HOSPITAL_ADMIN'],
      selectedHospital: null,
      cities,
      login: '',
      password: '',
      role: '',
      name: '',
    };
  },
  watch: {
    role(value) {
      if (value !== 'HOSPITAL_ADMIN') this.selectedHospital = null;
    },
  },
  computed: {
    hospitalNames() {
      return this.$store.getters['admin-hospitals/getHospitalNames'];
    },
  },
  methods: {
    async onSave() {
      if (this.$refs.form.validate()) {
        try {
          await this.$userAxios.post('/api/users', {
            login: this.login,
            password: this.password,
            name: this.name,
            hospitalId: this.selectedHospital,
            role: this.role,
          });
          this.onClose();
        } catch (error) {}
      }
    },
    onClose() {
      this.$refs.form.reset();
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.hospital-form-container {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;

  .title-text {
    margin-top: 20%;
  }
}

.dialog-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
}
</style>
