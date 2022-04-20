<template>
  <div class="q-ma-lg">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab @click="onBuilderClick" name="builder" label="Builder" />
        <q-tab name="json" label="Form Schema" />
        <q-tab name="render" label="Render" />
        <q-tab name="data" label="Data" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="builder">
          <input type="text" v-model="resource" />
          <select name="display" v-model="display" @change="reInit">
            <option value="wizard">Wizard</option>
            <option value="form">Form</option>
          </select>
          <div class="app_builder" ref="builder" id="builder"></div>
        </q-tab-panel>
        <q-tab-panel name="json">
          <!-- TODO json editor populate -->
          <pre>{{ this.form }}</pre>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel @click="onRendererClick" name="render">
          <form-renderer
            :resource="resource"
            :schema="form"
            v-model="formData"
          ></form-renderer>
        </q-tab-panel>
        <q-tab-panel name="data">
          <pre>{{ this.formData }}</pre>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { Formio } from "formiojs";
import FormioFormBuilder from "formiojs/FormBuilder";
import FormRenderer from "./FormRenderer.vue";

export default {
  components: {
    FormRenderer,
  },
  props: {
    value: {
      type: [Array, Object],
      default: function () {
        return {};
      },
    },
  },
  mounted() {
    this.form = Object.assign({}, this.form, this.value);
    this.init();
    this.loaded = true;
  },
  methods: {
    init() {
      const formBuilderRef = this.$refs.builder;
      const builder = new FormioFormBuilder(
        formBuilderRef,
        this.form,
        this.options
      );
      builder.instance.events.onAny((...args) => {
        const eventParts = args[0].split(".");
        // Only handle formio events.
        const namespace = "formio";
        if (eventParts[0] !== namespace || eventParts.length !== 2) {
          return;
        }

        // Remove formio. from event.
        args[0] = eventParts[1];

        this.$emit(...args);

        // Emit a change event if the schema changes.
        if (["updateComponent"].includes(eventParts[1])) {
          console.log("Event Parts", eventParts);
          args[0] = "change";
          this.$emit(...args);
          console.log("All data ", args);
          this.$emit("input", this.form);
        }
      });
    },
    reInit() {
      this.form.display = this.display;
      this.init();
    },
    onBuilderClick() {
      this.$nextTick(() => {
        this.init();
      });
    },
    onRendererClick() {},
  },
  data() {
    return {
      resource: "",
      display: "wizard",
      loaded: false,
      builder: null,
      form: {
        display: "wizard",
      },
      formData: null,
      options: {},
      tab: "builder",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~src/css/formio.css";
</style>
