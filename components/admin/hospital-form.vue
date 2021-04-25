<template>
  <div class="dialog-overlay">
    <v-form ref="form" class="dialog-wrapper" @submit.prevent="onSave">
      <div class="hospital-form-container">
        <div class="title-text subtitle-1">Код лікарні</div>
        <v-text-field
          outlined
          color="deep-purple"
          required
          :rules="idRules"
          v-model="id"
        ></v-text-field>
        <div class="title-text subtitle-1">Нас. пункт</div>
        <v-autocomplete
          v-model="city"
          outlined
          color="deep-purple"
          required
          :rules="[v => !!v || 'Обов\'язкове поле']"
          :items="cities"
          auto-select-first
        ></v-autocomplete>
        <div class="title-text subtitle-1">Назва</div>
        <v-text-field
          v-model="title"
          outlined
          color="deep-purple"
          required
          counter="50"
          :rules="titleRules"
        ></v-text-field>
        <div class="title-text subtitle-1">Адреса</div>
        <v-text-field
          v-model="address"
          outlined
          color="deep-purple"
          required
          counter="50"
          :rules="addressRules"
        ></v-text-field>
        <div class="title-text subtitle-1">К-сть ліжкомісць</div>
        <v-text-field
          type="number"
          min="0"
          outlined
          color="deep-purple"
          required
          v-model="totalBeds"
        ></v-text-field>
      </div>

      <div class="dialog-buttons">
        <v-btn @click="onClose">Відміна</v-btn>
        <v-btn type="submit" color="deep-purple lighten-2" dark>Зберегти</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import {
  idValidator,
  titleValidator,
  addressValidator,
} from '~/helpers/validators';
import { cities } from '~/helpers/cities';
export default {
  data() {
    return {
      idRules: [idValidator],
      titleRules: [titleValidator],
      addressRules: [addressValidator],
      cities,
      id: '',
      city: '',
      title: '',
      address: '',
      totalBeds: 10,
    };
  },
  methods: {
    async onSave() {
      if (this.$refs.form.validate()) {
        await this.$userAxios.post('/api/hospitals', {
          id: this.id,
          city: this.city,
          title: this.title,
          address: this.address,
          totalBeds: this.totalBeds,
        });
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
