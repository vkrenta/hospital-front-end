<template>
  <div class="stats-main">
    <div class="stats-container">
      <div class="cards-grid">
        <v-sheet class="paper" color="white" elevation="2" outlined rounded>
          <div class="text-h1">{{ hospitals }}</div>
          <div class="card-description">
            Зареєстровано лікарень
          </div>
        </v-sheet>
        <v-sheet class="paper" color="white" elevation="2" outlined rounded>
          <div class="text-h1">{{ hospitalizations }}</div>
          <div class="card-description">
            Госпіталізацій
          </div></v-sheet
        >
        <v-sheet class="paper" color="white" elevation="2" outlined rounded>
          <div class="text-h1">{{ recoveries }}</div>
          <div class="card-description">
            Одужань
          </div>
        </v-sheet>
        <v-sheet class="paper" color="white" elevation="2" outlined rounded>
          <div class="text-h1">{{ deads }}</div>
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
  loading: false,
  async asyncData(ctx) {
    const {
      hospitals,
      hospitalizations,
      recoveries,
      busyBeds,
      totalBeds,
      deads,
      periods,
      recoverySeries,
      deadSeries,
      hospitalizationSeries,
    } = await ctx.$axios.$get('/api/stats');

    return {
      hospitals,
      hospitalizations,
      recoveries,
      busyBeds,
      totalBeds,
      deads,
      periods,
      recoverySeries,
      deadSeries,
      hospitalizationSeries,
    };
  },
  created() {
    const repeat = async () => {
      const {
        hospitals,
        hospitalizations,
        recoveries,
        busyBeds,
        totalBeds,
        deads,
        periods,
        recoverySeries,
        deadSeries,
        hospitalizationSeries,
      } = await this.$axios.$get('/api/stats');

      this.hospitals = hospitals;
      this.hospitalizations = hospitalizations;
      this.recoveries = recoveries;
      this.busyBeds = busyBeds;
      this.totalBeds = totalBeds;
      this.deads = deads;
      this.periods = periods;
      this.recoverySeries = recoverySeries;
      this.deadSeries = deadSeries;
      this.hospitalizationSeries = hospitalizationSeries;

      await repeat();
    };

    repeat();
  },
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
          pointStart: Number(new Date(this.periods[0])),
          pointInterval: 24 * 3600 * 1000,
        },
      },

      series: [
        {
          name: 'Госпіталізацій',
          data: this.hospitalizationSeries,
        },
        {
          name: 'Летальний випадок',
          data: this.recoverySeries,
        },
        {
          name: 'Одужання',
          data: this.deadSeries,
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

    setInterval(() => {
      chart.series[0].setData(this.hospitalizationSeries);
      chart.series[1].setData(this.recoverySeries);
      chart.series[2].setData(this.deadSeries);
    }, 500);
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
