<template>
  <div style="width: 100%">
    <q-input
      :filled="filled"
      v-model="date"
      @input="handleInput"
      dense
      :outlined="outlined"
      :disable="disable"
      :readonly="readonly"
      :placeholder="placeholder"
      :rules="rules"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="date" @input="handleInput" :landscape="landscape" :mask="mask">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" :color="color" flat/>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="date" @input="handleInput" :mask="mask" :landscape="landscape">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="color" flat/>
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { date } from "quasar";
const { formatDate } = date;

export default {
  props: {
    value: {
      required: true
    },
    mask: {
      type: String,
      default: "YYYY-MM-DD HH:mm:ss"
    },
    color: {
      type: String,
      default: "primary"
    },
    outlined: {
      type: Boolean,
      default: true
    },
    landscape: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    setCurrentTime: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Array, Object],
      required: false
    }
  },
  data() {
    return {
      date: this.initializeDateTime(this.value)
    };
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
    initializeDateTime(val) {
      let value = "";
      let dt = null;
      if (val) {
        dt = new Date(val);
        value = formatDate(dt, this.mask);
      } else if (this.setCurrentTime) {
        dt = new Date();
        value = formatDate(dt, this.mask);
      }
      this.$emit("input", value);
      return value;
    }
  },
  created() {},
  watch: {
    value: function(newVal) {
      this.date = this.initializeDateTime(newVal);
    }
  }
};
</script>

<style></style>
