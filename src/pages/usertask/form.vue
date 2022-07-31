<template>
  <div>
    <form-renderer
      v-if="!loading"
      v-model="formData"
      :schema="schema"
      :resource="resource"
      @complete="handleComplete"
    ></form-renderer>
    <!-- <p>
      TaskId: {{ $route.query.taskId }}
      <br />
      CallbackUrl: {{ $route.query.callbackUrl }}
    </p> -->
  </div>
</template>

<script>
export default {
  created() {
    this.init();
  },
  data() {
    return {
      loading: false,
      router: "",
      response: "",
      schema: {},
      formData: {},
    };
  },
  computed: {
    resource() {
      return `api/user-tasks/${this.$route.query.taskId}`;
    },
  },
  methods: {
    async init() {
      this.loading = true;
      let response = await this.$axios.get(
        `/api/user-tasks/${this.$route.query.taskId}`
      );
      this.loading = false;
      this.schema = response.schema;
      if (this.$route.query.populate) {
        this.formData = response.variables;
      }
    },
    handleComplete() {
      window.location.assign(this.$route.query.callbackUrl);
    },
  },
};
</script>

<style></style>
