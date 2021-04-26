<template>
  <div class="dialog-overlay">
    <v-from class="dialog-wrapper">
      <div class="form-title text-h3">
        Додати пацієнта
      </div>

      <div class="inputs-container">
        <v-text-field outlined label="ПІБ пацієнта"></v-text-field>
        <div class="c-row">
          <v-select outlined label="Стать" :items="genders"></v-select>
          <v-text-field
            min="0"
            type="number"
            outlined
            label="Вік"
          ></v-text-field>
          <v-select outlined :items="conditions" label="Стан"></v-select>
        </div>

        <div class="c-row">
          <v-select
            outlined
            :items="symptoms"
            chips
            multiple
            label="Симптоми"
          ></v-select>
          <v-select outlined :items="diagnosis" label="Діагноз"></v-select>
        </div>

        <div class="c-row">
          <v-text-field outlined label="Тиск"></v-text-field>
          <v-text-field outlined label="Температура"></v-text-field>
          <v-select outlined :items="results" label="Результат"></v-select>
        </div>

        <v-textarea rows="3" outlined label="Опис"></v-textarea>
      </div>

      <div class="c-row">
        <v-dialog
          ref="fdialog"
          v-model="fmodal"
          :return-value.sync="fdate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              v-model="fdate"
              label="Дата госпіталізації"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker locale="uk-UA" v-model="fdate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="fmodal = false">
              Відміна
            </v-btn>
            <v-btn text color="primary" @click="$refs.fdialog.save(fdate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <v-dialog
          ref="sdialog"
          v-model="smodal"
          :return-value.sync="sdate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              v-model="sdate"
              label="Дата результату утримування (якщо є)"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker locale="uk-UA" v-model="sdate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="smodal = false">
              Відміна
            </v-btn>
            <v-btn text color="primary" @click="$refs.sdialog.save(sdate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>

      <div class="dialog-buttons">
        <v-btn @click="onClose">Відміна</v-btn>
        <v-btn type="submit" color="deep-purple lighten-2" dark>Зберегти</v-btn>
      </div>
    </v-from>
  </div>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
  data() {
    return {
      genders: ['Чоловіча', 'Жіноча'],
      conditions: [
        'Задовільний',
        'Середньої тяжкості',
        'Тяжкий',
        'Надміру тяжкий',
      ],
      symptoms: [
        'Зовнішня кровотеча',
        'Внутрішня кровотеча',
        'Опіки',
        'Головний біль',
        'Підвищена температура',
        'Вологий кашель',
        'Сухий кашель',
        'Біль у горлі',
        'Біль у грудях',
        'Нежить',
        'Надмірна втома',
        'Надмірне потовиділення',
        'Біль у животі',
      ],
      diagnosis: [
        'Запалення легень',
        'Інфаркт',
        'Інсульт',
        'Апендицит',
        'Гастрит',
        'Виразка',
      ],
      results: ['На утриманні', 'Одужання', 'Летальний випадок'],
      sdate: '',
      smodal: false,
      fdate: '',
      fmodal: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  max-width: 800px;
  width: 100%;

  .inputs-container {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .c-row {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 3%;
    }
  }
}

.dialog-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
}
</style>
