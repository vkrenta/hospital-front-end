<template>
  <div class="stats-main">
    <div class="stats-container">
      <div class="cards-grid">
        <v-sheet class="paper" color="white" elevation="2" outlined rounded>
          <div class="text-h1">15</div>
          <div class="card-description">
            Зареєстровано лікарень
          </div>
        </v-sheet>
        <v-sheet class="paper" color="white" elevation="2" outlined rounded>
          <div class="text-h1">31</div>
          <div class="card-description">
            Госпіталізацій
          </div></v-sheet
        >
        <v-sheet class="paper" color="white" elevation="2" outlined rounded>
          <div class="text-h1">15</div>
          <div class="card-description">
            Одужань
          </div>
        </v-sheet>
        <v-sheet class="paper" color="white" elevation="2" outlined rounded>
          <div class="text-h1">5</div>
          <div class="card-description">
            Летальних випадків
          </div>
        </v-sheet>
      </div>

      <v-sheet
        style="display: flex; flex-direction:column; align-items:center; gap: 10px; padding: 5px; margin-top: 40px"
        color="white"
        elevation="2"
        outlined
        rounded
      >
        <div class="text-h1">{{ busyBeds }} / {{ totalBeds }}</div>
        <div class="card-description">
          Ліжкомісць заповнено
        </div>

        <v-progress-linear
          color="success"
          striped
          v-model="bedsPercent"
          height="25"
        >
          <strong>{{ Math.ceil(bedsPercent) }}%</strong>
        </v-progress-linear>
      </v-sheet>

      <div id="chart-container" style="width:100%; height:400px;"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
export default {
  mounted() {
    Highcharts.setOptions({
      lang: {
        monthes: [
          'Січень',
          'Лютий',
          'Березень',
          'Квітень',
          'Травень',
          'Червень',
          'Липаень',
          'Серпень',
          'Вересень',
          'Жовтень',
          'Листопад',
          'Грудень',
        ],
        weekdays: [
          'Неділя',
          'Понеділок',
          'Вівторок',
          'Середа',
          'Четвер',
          "П'ятниця",
          'Субота',
        ],
      },
    });
    const chart = Highcharts.chart('chart-container', {
      title: {
        text: 'Статистика по госпіталізаціях',
      },

      yAxis: {
        title: {
          text: 'Кількість випадків',
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Весь період',
        },
        type: 'datetime',
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: Number(new Date(2021, 4, 20)),
          pointInterval: 24 * 3600 * 1000,
        },
      },

      series: [
        {
          name: 'Госпіталізацій',
          data: [1, 3, 2, 5, 4, 6, 10],
        },
        {
          name: 'Летальний випадок',
          data: [0, 0, 0, 2, 0, 3, 1],
        },
        {
          name: 'Одужання',
          data: [0, 0, 2, 3, 2, 4, 4],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    });
  },
  computed: {
    bedsPercent() {
      return (this.busyBeds / this.totalBeds) * 100;
    },
  },
  data() {
    return {
      totalBeds: 200,
      busyBeds: 11,
    };
  },
};
</script>

<style lang="scss" scoped>
.stats-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .stats-container {
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    width: 100%;
    padding: 20px;

    .cards-grid {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3%;

      .paper {
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }
  }
}
</style>
