<template>
  <div class="info-indicator">
    <div class="bg-white q-pa-md row justify-between items-center">
      <div class="indicator-info">
        <div class="info-title text-uppercase font-md">{{ data.title }}</div>
        <div class="info-stat font-lg text-weight-bold">{{ data.stat }}</div>
        <div class="info-status font-md">
          <q-icon
            v-if="data.status == 'up'"
            class="text-weight-bold"
            color="primary"
            name="las la-arrow-up"
          ></q-icon>
          <q-icon class="text-weight-bold" v-else color="negative" name="las la-arrow-down"></q-icon>
          Since {{ data.since }}
        </div>
      </div>
      <div class="indicator-icon float-right text-center text-accent text-weight-bold">
        <q-icon class="font-xl block" name="las la-chart-line"></q-icon>

        <router-link class="text-primary block" :to="data.link">View</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
// .indicator-info,
// .indicator-icon {
//   display: inline-block;
// }
</style>
