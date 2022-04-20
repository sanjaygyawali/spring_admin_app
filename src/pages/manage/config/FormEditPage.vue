<template>
  <div :key="resourceName">
    <form-renderer
      :resource="resource"
      v-if="!loading"
      :schema="schema"
    ></form-renderer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resourceName: "",
      schema: null,
      loading: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.resourceName = this.$route.params.resource;

      this.fetchSchemaForResource();
    },
    async fetchSchemaForResource() {
      this.loading = true;
      let response = await this.$axios.get(
        `/api/forms/schema/${this.resourceName}`
      );
      this.loading = false;
      this.schema = response.schema;
    },
    async fetchData() {},
  },
  computed: {
    resource() {
      return `api/${this.resourceName}`;
    },
  },
  watch: {
    "$route.params.resource": {
      handler: function () {
        this.init();
      },
      immediate: true,
    },
  },
};
</script>

<style></style>
