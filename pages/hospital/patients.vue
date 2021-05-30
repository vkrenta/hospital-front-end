<template>
  <div class="patients-container">
    <patient-form
      v-show="patientDialogShowed"
      @close="patientDialogShowed = false"
    />
    <div class="header-section">
      <div class="text-h4" style="display: flex; align-items: flex-start">
        Пацієнти <span class="text-h6">{{ [patients.length] }}</span>
      </div>
      <v-btn
        rounded
        fab
        style="margin-left: auto; margin-right: 4%"
        color="green lighten-2"
        dark
      >
        <v-icon>
          mdi-file-upload
        </v-icon>
      </v-btn>
      <v-btn
        rounded
        fab
        color="deep-purple lighten-2"
        dark
        @click="patientDialogShowed = true"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>

    <!-- <div class="dialog-overlay">
      <div class="dialog-wrapper">
        <div class="mb-3 text-h5">Завантаження пацієнтів</div>
        <v-file-input
          :disabled="loading"
          outlined
          placeholder="Формат файлу .csv"
          style="width: 400px"
        ></v-file-input>
        <div
          style="display: flex;flex-direction: row;justify-content: flex-end;gap: 10px;"
        >
          <v-btn @click="onClose">Відміна</v-btn>
          <v-btn
            type="submit"
            :loading="loading"
            @click="loading = true"
            color="green lighten-2"
            dark
            >Надіслати</v-btn
          >
        </div>
      </div>
    </div> -->

    <div
      v-if="!patients.length"
      style="text-align: center; opacity: 0.4; margin-top: 80px"
    >
      Немає даних
    </div>

    <div class="cards-grid">
      <div v-for="item in patients" :key="item._id" class="card">
        <div class="title">{{ item.hospitalizedAt }}</div>

        <div class="text-subtitle-2">{{ item.name }}</div>

        <div class="info-block">
          <div>Вік:</div>
          <div>Стать:</div>
          <div>Стан:</div>

          <div>{{ item.age }}</div>
          <div>{{ item.gender }}</div>
          <div>{{ item.condition }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import patientForm from '~/components/hospital/patient-form.vue';
export default {
  layout: 'admin',
  components: { patientForm },
  data() {
    return {
      patientDialogShowed: false,
      loading: false,
      patients: [
        // {
        //   _id: 1,
        //   name: 'Крента Василь Степанович',
        //   hospitalizedAt: '21.04.2021',
        //   gender: 'Чоловіча',
        //   age: '22',
        //   condition: 'Тяжкий',
        // },
        // {
        //   _id: 2,
        //   name: 'Петренко Петро Петрович',
        //   hospitalizedAt: '21.04.2021',
        //   gender: 'Чоловіча',
        //   age: '25',
        //   condition: 'Середньої тяжкості',
        // },
        // {
        //   _id: 3,
        //   name: 'Іваненко Іванна Іванівна',
        //   hospitalizedAt: '21.04.2021',
        //   gender: 'Жіноча',
        //   age: '20',
        //   condition: 'Надміру тяжкий',
        // },
        // {
        //   _id: 3,
        //   name: 'Чорна Ірина Ігорівна',
        //   hospitalizedAt: '21.04.2021',
        //   gender: 'Жіноча',
        //   age: '18',
        //   condition: 'Задовільний',
        // },
        // {
        //   _id: 4,
        //   name: 'Андрієнко Андрій Андрійович',
        //   hospitalizedAt: '26.04.2021',
        //   gender: 'Чоловіча',
        //   age: '35',
        //   condition: 'Середньої тяжкості',
        // },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.patients-container {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .header-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 20px;
  }

  .cards-grid {
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    .card {
      border: 1px solid rgb(221, 221, 221);
      border-radius: 5px;
      padding: 10px;

      .info-block {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: auto auto auto;
        grid-template-columns: auto 1fr;
        column-gap: 30px;
        div {
          font-size: 14px;
        }
      }

      .title,
      .text-subtitle-2 {
        text-align: center;
      }

      &:hover {
        cursor: pointer;
        background-color: #9575cd49;
      }
    }
  }
}
</style>
