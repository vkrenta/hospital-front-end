<template>
  <div class="dialog-overlay">
    <v-form class="dialog-wrapper" @submit.prevent="onSubmit()">
      <div class="form-title text-h3">
        Додати пацієнта
      </div>

      <div class="inputs-container">
        <v-text-field
          outlined
          label="ПІБ пацієнта"
          v-model="patient.name"
        ></v-text-field>
        <div class="c-row">
          <v-select
            outlined
            item-text="text"
            item-value="value"
            label="Стать"
            :items="genders"
            v-model="patient.gender"
          ></v-select>
          <v-text-field
            min="0"
            type="number"
            v-model="patient.age"
            outlined
            label="Вік"
          ></v-text-field>
          <v-select
            outlined
            :items="conditions"
            v-model="patient.condition"
            label="Стан"
          ></v-select>
        </div>

        <div class="c-row">
          <v-select
            outlined
            :items="symptoms"
            chips
            multiple
            label="Симптоми"
            v-model="patient.symptomIds"
          ></v-select>
          <v-select
            outlined
            :items="diagnosis"
            v-model="patient.diagnose"
            label="Діагноз"
          ></v-select>
        </div>

        <div class="c-row">
          <v-text-field
            outlined
            v-model="patient.pressure"
            label="Тиск"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="patient.temperature"
            label="Температура"
          ></v-text-field>
          <v-select
            outlined
            :items="results"
            v-model="patient.result"
            label="Результат"
          ></v-select>
        </div>

        <v-textarea
          rows="3"
          outlined
          v-model="patient.description"
          label="Опис"
        ></v-textarea>
      </div>

      <div class="c-row">
        <v-dialog
          ref="fdialog"
          v-model="fmodal"
          :return-value.sync="patient.hospitalizedAt"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              v-model="patient.hospitalizedAt"
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
          :return-value.sync="patient.resultAt"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              v-model="patient.resultAt"
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
        <v-btn @click="onClose()">Відміна</v-btn>
        <v-btn type="submit" color="deep-purple lighten-2" dark>Зберегти</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  async beforeCreate() {
    const diagnosis = await this.$axios.$get('/api/patients/diagnosis');
    const symptoms = await this.$axios.$get('/api/patients/symptoms');

    this.diagnosis = diagnosis;
    this.symptoms = symptoms;
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onSubmit() {
      try {
        console.log(this.patient);
        this.$axios.$post('/api/patients', this.patient);
      } catch (error) {}
    },
  },
  data() {
    return {
      genders: [
        { value: 1, text: 'Чоловіча' },
        { value: 2, text: 'Жіноча' },
      ],
      conditions: [
        'Задовільний',
        'Середньої тяжкості',
        'Тяжкий',
        'Надміру тяжкий',
      ],
      symptoms: [],
      diagnosis: [],
      results: ['На утриманні', 'Одужання', 'Летальний випадок'],
      sdate: '',
      smodal: false,
      fdate: '',
      fmodal: false,
      patient: {
        hospitalId: localStorage.getItem('user').hospitalId,
        name: '',
        gender: 'Чоловіча',
        age: 0,
        condition: '',
        symptomIds: [],
        diagnoseId: '',
        pressure: '',
        temperature: '',
        result: '',
        description: '',
        hospitalizedAt: '',
        resultAt: '',
      },
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
