<template>
  <div class="line-chart">
    <div class="card q-px-md q-py-md" style="background:white;">
      <div class="card-title">{{ title }}</div>
      <apexchart
        :type="type"
        :width="width"
        :height="height"
        :options="options"
        :series="series"
        :key="remountCounter"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    width: {
      type: [Number, String],
      default: "100%"
    },
    height: {
      type: [Number, String],
      default: "auto"
    },
    series: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    xAxisType: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      remountCounter: 0
    };
  },
  computed: {
    options() {
      return this.constructChartOptions();
    }
  },
  methods: {
    constructChartOptions() {
      return this.chartOptions;
    }
  },
  mounted() {
    setTimeout(() => {
      this.remountCounter++;
    }, 100);
  }
};
</script>
