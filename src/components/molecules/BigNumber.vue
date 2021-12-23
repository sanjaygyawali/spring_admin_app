<template>
  <div class="info-indicator">
    <div class="bg-white q-pa-md row items-center justify-between width-100">
      <div class="info-title text-uppercase font-md">{{ title }}</div>

      <div class="indicator-info">
        <div class="info-stat text-lg text-weight-bold text-right text-dark">{{ data }}</div>
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
      type: [Number, String],
      required: true
    },
    icon: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.indicator-info {
}
.info-stat {
  font-size: 25px;
}
</style>
