<template>
  <div class="q-ma-md bg-white q-pa-md">
    <div>
      <button @click="externalSubmit">Submit</button>
      <button @click="externalReset">Reset</button>
    </div>
    <div class="app_builder" ref="render" id="render"></div>
  </div>
</template>

<script>
import { Formio } from "formiojs";
import FormioForm from "formiojs/Form";

export default {
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      },
    },
    schema: {
      type: Object,
      default: function () {
        return {};
      },
    },
    formOptions: {
      type: Object,
      default: function () {
        return {};
      },
    },
    resource: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "create",
    },
    resourceId: {
      type: [String, Number],
      default: "",
    },
    // prefix: {
    //   type: String,
    //   default: "resource",
    // },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      form: {},
      options: {},
      render: "render",
      formData: {},
      formInstance: null,
    };
  },
  methods: {
    init() {
      this.form = this.schema;
      this.formData = this.value;
      this.options == this.formOptions;
      const formRenderRef = this.$refs.render;
      const formRenderer = new FormioForm(
        formRenderRef,
        this.form,
        this.options
      );
      formRenderer.instance.setSubmission({
        data: this.value,
      });
      this.formInstance = formRenderer.instance;
      // this.externalReset = formRenderer.instance.resetValue;
      // this.externalSubmit = formRenderer.instance.submit;
      formRenderer.events.onAny((...args) => {
        const eventParts = args[0].split(".");
        // Only handle formio events.
        const namespace = "formio";
        if (eventParts[0] !== namespace || eventParts.length !== 2) {
          return;
        }

        // Remove formio. from event.
        args[0] = eventParts[1];
        // debugger;

        this.$emit(...args);
        // Emit custom events under their own name as well.
        if (eventParts[1] === "customEvent") {
          args[0] = args[1].type;
          context.emit(...args);
        }

        if (eventParts[1] === "change") {
          this.$emit("input", args[1].data);
          this.formData = args[1].data;
        } else if (eventParts[1] === "submit") {
          this.submitForm();
        }
      });
    },
    externalSubmit() {
      this.formInstance.submit();
    },
    externalReset() {
      this.formInstance.resetValue();
    },
    submitForm() {
      let resourceUrl = this.resource;
      // if (this.prefix != "") {
      //   resourceUrl = `${this.prefix}/${this.resource}`;
      // }
      console.log(resourceUrl);
      if (this.mode == "create") {
        this.$repo(resourceUrl).create(this.formData);
      } else if (this.mode == "edit") {
        this.$repo(resourceUrl).update(this.formData, this.resourceId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~src/css/formio.css";
</style>
