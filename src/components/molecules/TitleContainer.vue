<template>
  <div class="q-pb-md">
    <div class="row full-width q-pb-sm items-center justify-between">
      <div class="row">
        <q-icon
          size="lg"
          class="cursor-pointer"
          @click="goBack"
          color="secondary"
          name="o_chevron_left"
        ></q-icon>
        <div v-if="title" class="text-uppercase form-title text-h4">{{ title }}</div>
      </div>
      <div>
        <slot name="actions"></slot>
        <q-btn
          v-if="showAddButton"
          color="primary"
          unelevated
          @click="handleAddClicked"
          :label="addButtonLabel"
          class="add-btn q-ml-sm"
        />
      </div>
    </div>
    <q-separator/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    showAddButton: {
      type: Boolean,
      default: false
    },
    addButtonLabel: {
      type: String,
      default: "Add"
    },
    slug: {
      type: String
    },
    redirectTo: {
      type: String,
      required: false
    }
  },
  methods: {
    goBack() {
      if (this.redirectTo) {
        this.router.push(this.redirectTo);
      } else {
        this.$router.go(-1);
      }
    },
    handleAddClicked() {
      this.$router.push(`/${this.slug}/create`);
    }
  }
};
</script>

<style>
.form-title {
  font-size: 18.5px;
  font-weight: 500;
}
.back-btn {
  width: 34px;
  height: 34px;
}
</style>
