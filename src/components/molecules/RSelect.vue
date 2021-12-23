<template>
  <q-select
    v-model="localValue"
    use-input
    input-debounce="500"
    outlined
    dense
    option-label="name"
    :options="localOptions"
    @filter="filterFn"
    @input="onChange"
    :key="remountCounter"
    mapOptions
    :disable="disable"
    input-style="padding: 5px"
    :multiple="multiple"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:append>
      <q-spinner-tail v-if="loading" color="primary" />
    </template>
  </q-select>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: {
      validator: prop => ["string", "object", "number"].includes(typeof prop),
      // type: [Number, String, Object],
      required: true,
      default: ""
    },
    url: {
      type: String,
      required: false
    },
    tableName: {
      type: String,
      required: false
    },
    emitObject: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Object
    },
    disable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: null,
      localOptions: [],
      term: "",
      remountCounter: 0,
      localValue: "",
      loading: false
    };
  },
  async created() {
    if (!this.options.length) {
      await this.fetchOptions();
    } else {
      this.localOptions = options;
    }
    if (this.value) {
      this.localValue = this.value;
    } else {
      if (this.multiple) {
        this.localValue = [];
      } else {
        this.localValue = "";
      }
    }
  },

  methods: {
    async fetchOptions() {
      // TODO: implement paginatin.
      this.loading = true;
      let data = await this.$axios.$get(this.computedUrl, {
        term: this.term,
        filter: JSON.stringify(this.filter)
      });
      this.localOptions = data;
      this.loading = false;
    },

    async filterFn(val, update, abort) {
      this.term = val;
      await update(async () => {
        await this.fetchOptions();
      });
    },
    emitValue(value) {
      if (this.multiple) {
        let newVal = [];
        value.forEach(element => {
          if (this.emitObject) {
            newVal.push(element);
          } else if (typeof element == "object") {
            newVal.push(element.value);
          } else {
            newVal.push(element);
          }
        });
        this.$emit("input", newVal);
      } else {
        if (this.emitObject) {
          this.$emit("input", value);
        } else if (typeof value == "object") {
          this.$emit("input", value.value);
        } else {
          this.$emit("input", value);
        }
      }
    },
    onChange(value) {
      this.emitValue(value);
    }
  },
  computed: {
    computedUrl() {
      if (this.tableName != "") {
        return `v1/schema/${this.tableName}`;
      }
      return this.url;
    }
  },
  watch: {
    localValue(newValue, oldValue) {
      this.remountCounter++;
      this.emitValue(newValue);
    }
  }
};
</script>

<style>
.q-field__control-container > .q-field__native.row {
  padding: 0;
}
</style>
