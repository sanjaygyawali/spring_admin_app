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
    <input type="text" v-model="form.name" placeholder="Enter name of form" />
    <input type="text" v-model="form.tag" placeholder="Enter name of form" />
    <button type="submit" @click="submit">submit</button>
    <br />
    <span>Schema</span>
    <r-form-builder v-if="!loading" v-model="formSchema"></r-form-builder>
    <br />
    <span>Display Schema</span>
    <r-form-builder v-if="!loading" v-model="displaySchema"></r-form-builder>
  </q-page>
</template>

<script>
import RFormBuilder from "src/components/organisms/FormBuilder.vue";
export default {
  components: {
    RFormBuilder,
  },
  data() {
    return {
      formSchema: { display: "wizard", components: [] },
      displaySchema: { display: "wizard", components: [] },
      resourceName: "forms",
      loading: false,
      resourceId: "",
      mode: "create",
      form: {
        name: "",
        tag: "",
        schema: "",
        draftSchema: null,
        formSchema: null,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.resourceId = this.$route.params.id;
      if (this.resourceId) {
        this.mode = "edit";
        await this.fetchDataOfResource();
      }
    },
    async fetchDataOfResource() {
      this.loading = true;
      const data = await this.$repo(`api/forms`).show(this.resourceId);
      this.form = data;
      this.formSchema = data.schema;
      this.loading = false;
    },
    async submit() {
      this.form.schema = this.formSchema;
      if (this.mode == "create") {
        await this.$repo("api/forms").create(this.form);
      } else {
        await this.$repo("api/forms").update(this.form, this.resourceId);
      }
    },
  },
  computed: {
    resource() {
      return `api/${this.resourceName}`;
    },
  },
};
</script>

<style></style>
