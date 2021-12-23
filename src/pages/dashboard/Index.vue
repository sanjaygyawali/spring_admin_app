<template>
  <q-page>
    <div class="row q-col-gutter-md page-card">
      <div
        v-for="(card, index) in cards"
        :class="'col-md-' + card.span + ' col-xs-12'"
        :key="'card_' + index"
      >
        <r-indicator v-if="card.type == 'indicator'" :title="card.title" :data="card.data"></r-indicator>
        <r-chart v-if="card.component == 'r-chart'" v-bind="card"></r-chart>
        <big-number v-if="card.component == 'big-number'" :title="card.title" v-bind="card"></big-number>
      </div>
    </div>
  </q-page>
</template>

<script>
import RChart from "src/components/molecules/RChart";
import RIndicator from "src/components/molecules/RIndicator";
import BigNumber from "src/components/molecules/BigNumber";

export default {
  name: "AdminDashboard",
  components: {
    RChart,
    RIndicator,
    BigNumber
  },
  data() {
    return {
      cityList: [],
      cards: []
    };
  },
  async created() {
    let res = await this.$user.getCommodities();
    console.log(res);
    await this.getDashboardConfiguration();
  },
  methods: {
    async getDashboardConfiguration() {
      try {
        let res = await this.$axios.get("http://localhost:8082/test/city");
        if (res) {
          this.cityList = res.cityList;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
