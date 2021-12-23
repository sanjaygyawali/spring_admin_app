<template>
  <div>
    <BlitzForm
      :id="id"
      :mode="mode"
      :class="{ 'left-labels': masterSchema.labelPosition == 'left' }"
      v-if="!loading"
      v-model="formData"
      v-bind="masterSchema"
      ref="form"
      :actionButtons="actionButtons"
      :actionButtonDefaults="actionButtonDefaults"
      :actionButtonsPosition="actionButtonsPosition"
      @cancel="cancelForm"
      @input="emitInput"
      :key="remountCounter"
      class="search-form"
    />
  </div>
</template>

<script>
import { BlitzForm } from "blitzar";

export default {
  components: { BlitzForm },
  props: {
    id: {
      type: [String, Number],
      default: "0"
    },
    editMode: {
      default: false,
      type: Boolean
    },
    post: {
      type: String
    },
    value: {
      type: Object
      // required:true
    },
    schema: {
      type: [Array, Object],
      default: function() {
        return {};
      }
    },
    autoclear: {
      type: Boolean,
      default: true
    },
    actionButtons: {
      type: Array,
      default: function() {
        return ["cancel", "save"];
      }
    },
    mode: {
      type: String,
      default: "edit"
    },
    notifyError: {
      type: Boolean,
      default: true
    },
    actionButtonsPosition: {
      type: String,
      default: "bottom"
    },
    editUrl: {
      type: String,
      required: false
    },
    fetchUrl: {
      type: String,
      default: ""
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      actionButtonDefaults: {
        cancel: {
          component: "QBtn",
          color: "primary",
          outline: true,
          unelevated: true,
          showCondition: (_, { formData, mode }) => {
            return this.mode != "view";
          }
        },
        save: {
          component: "qBtn",
          color: "primary",
          unelevated: true,
          evaluatedProps: ["disable", "slot"],
          slot: () => {
            return this.editMode ? "UPDATE" : "SAVE";
          },
          disable: (val, { formData }) => {
            return this.processing;
          },
          showCondition: (_, { formData, mode }) => this.mode != "view",
          events: {
            click: (event, { formData }) => {
              this.saveFormData();
            }
          }
        },
        search: {
          component: "q-btn",
          color: "primary",

          slot: "search",
          iconRight: "search",
          showCondition: (_, { formData }) => this.mode == "filter",
          // showCondition: (_, { formData }) => 1 == 1,
          events: {
            click: (event, { formData }) => {
              this.$emit("search", formData);
            }
          }
        },
        reset: {
          component: "q-btn",
          slot: "reset",
          iconRight: "restart_alt",
          showCondition: (_, { formData }) => 1 == 1,
          events: {
            click: (event, { formData }) => {
              this.clearFormData();
              this.$nextTick(() => {
                this.$emit("reset");
              });
            }
          }
        }
      },
      loading: false,
      processing: false,
      masterSchema: {},
      formData: {},
      remountCounter: 0,
      refresh: false,
      editApi: ""
    };
  },
  methods: {
    saveFormData() {
      if (this.post != "") {
        this.$refs.form
          .validate()
          .then(response => {
            this.processing = true;
            this.$loader.setLoading();
            let keys = Object.keys(this.formData);
            new Promise((resolve, reject) => {
              keys.forEach((el, id) => {
                if (
                  !this.formData[el] &&
                  ![0, "0"].includes(this.formData[el])
                ) {
                  this.formData[el] = null;
                }
                if (id == keys.length) {
                  resolve();
                }
              });
            });
            if (this.editMode) {
              //if edit form mode
              this.$axios
                .put(this.editApi, this.formData)
                .then(response => {
                  this.$q.notify({
                    message: "Success",
                    caption:
                      this.masterSchema.editSuccessMessage ||
                      response.message ||
                      "Edited Successfully",
                    type: "positive",
                    offset: 50
                  });
                  this.$emit("success", response.data);
                  this.processing = false;
                  this.$loader.setLoading(false);
                  if (this.masterSchema.redirectTo) {
                    this.$router.push(this.masterSchema.redirectTo);
                  } else if (this.masterSchema.redirectToOnEdit) {
                    this.$router.push(this.masterSchema.redirectToOnEdit);
                  }
                })
                .catch(error => {
                  this.$q.notify({
                    message: "Error",
                    caption:
                      this.successMessage ||
                      error.error.message ||
                      "Some Error Occured",
                    type: "negative",
                    offset: 50
                  });
                  this.processing = false;
                  this.$loader.setLoading(false);
                  // this.$emit('error');
                });
              // .finally(t => {
              //   this.processing = false;
              // });
            } else {
              //if create new form mode
              this.$axios
                .post(this.post, this.formData)
                .then(response => {
                  this.$q.notify({
                    message: "Success",
                    caption:
                      this.masterSchema.message ||
                      response.message ||
                      "Operation Successfull",
                    type: "positive",
                    offset: 50
                  });
                  this.$emit("success", response.data);
                  this.clearFormData();
                  this.processing = false;
                  if (this.masterSchema.redirectTo) {
                    this.$router.push(this.masterSchema.redirectTo);
                  }
                })
                .catch(error => {
                  this.$emit("error", error);
                  if (this.notifyError) {
                    this.$q.notify({
                      message: "Error",
                      caption: "Some Error Occured",
                      type: "negative",
                      offset: 50
                    });
                  }

                  this.processing = false;
                  this.$loader.setLoading(false);
                  // this.$emit('error');
                });
              // .finally(t => {
              //   this.processing = false;
              // });
            }
          })
          .catch(error => {});
      } else {
      }
      return true;
    },
    clearFormData() {
      this.formData = {};
      this.remountCounter++;
    },
    refreshForm() {
      this.remountCounter = this.remountCounter + 1;
    },
    emitInput() {
      this.$emit("input", this.formData);
    },
    async validateForm() {
      await this.$refs.form.validate();
    },
    cancelForm() {
      this.$emit("cancel");
      this.clearFormData();
      if (this.schema.redirectToOnCancel) {
        this.$router.push(this.schema.redirectToOnCancel);
      } else if (this.schema.redirectTo) {
        this.$router.push(this.schema.redirectTo);
      }
    },
    async fetchEditData(id) {
      this.loading = true;
      let fetchUrl = this.fetchUrl
        ? this.fetchUrl
        : `${this.masterSchema.api}/${id}`;
      this.$loader.setLoading();
      const res = await this.$axios.get(fetchUrl);
      if (res && res.data) {
        this.formData = res.data;
        this.remountCounter++;
        // for (let key in res.data) {
        //   this.$set(this.form, key, res.data[key]);
        // }
      }
      this.loading = false;
      this.$loader.setLoading(false);
    },
    increaseCounter() {
      this.remountCounter++;
    }
    // fetchSchemaOfForm() {
    //   this.loading = true;
    //   this.$axios.get(`/form-schema/${this.id}`).then((response) => {
    //     this.masterSchema = response.data;
    //     this.loading = false;
    //   });
    // },
  },
  created() {
    if (Object.keys(this.schema).length === 0) {
      // this.fetchSchemaOfForm();
    } else {
      this.masterSchema = this.schema;
    }
    // if (this.value) {
    //   this.formData = this.value;
    // }
    const params = this.$route.params;
    if (this.editMode && params && params.id) {
      this.editApi = this.editUrl ? this.editUrl : `${this.post}/${params.id}`;
      this.fetchEditData(params.id);
    }
  },
  watch: {
    editMode: function(newVal, oldVal) {
      if (this.editUrl) {
        this.editApi = this.editUrl;
      } else {
        this.editApi = this.post;
      }
    }
  }
};
</script>

<style>
.blitz-field {
  grid-gap: 0px 16px;
}
.q-field--with-bottom {
  padding-bottom: 6px;
  padding-top: 3px;
}
</style>
