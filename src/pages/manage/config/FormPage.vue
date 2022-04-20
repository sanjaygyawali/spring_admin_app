<template>
  <q-page>
    <title-container :title="resourceName">
      <div slot="actions">
        <q-btn
          color="primary"
          unelevated
          :to="{
            path: `/r/${resourceName}/list`,
          }"
          label="List"
          class="add-btn q-ml-sm"
        />
      </div>
    </title-container>
    <div :key="resourceName">
      <form-renderer
        :resource="resource"
        v-if="!loading"
        :schema="schema"
        v-model="formData"
        :resourceId="resourceId"
        :mode="mode"
      ></form-renderer>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      resourceName: "",
      schema: null,
      loading: true,
      formData: null,
      resourceId: "",
      mode: "create",
    };
  },
  created() {
    // this.init();
  },
  methods: {
    async init() {
      this.resourceName = this.$route.params.resource;
      this.resourceId = this.$route.params.id;
      if (this.resourceId) {
        this.mode = "edit";
        await this.fetchDataOfResource();
      }
      await this.fetchSchemaForResource();
    },
    async fetchSchemaForResource() {
      this.loading = true;
      let response = await this.$axios.get(
        `/api/forms/schema/${this.resourceName}`
      );
      this.loading = false;
      this.schema = response.schema;
    },
    async fetchDataOfResource() {
      const data = await this.$axios.get(`${this.resource}/${this.resourceId}`);
      this.formData = data;
    },
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
