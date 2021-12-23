<template>
  <div>
    <q-file
      v-model="files"
      label="Load documents"
      counter
      :outlined="outlined"
      use-chips
      multiple
      clearable
      dense
      :accept="accept"
      :max-files="maxFiles"
      :max-file-size="maxFileSize"
      @input="onInput"
      @rejected="onRejected"
      @clear="onClear"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <div v-if="uploadedUrl.length" class="row items-center">
      <div
        v-for="(url, index) in uploadedUrl"
        :key="'pImg_' + index"
        class="preview-img q-ma-sm relative-position row items-center"
        @click="showPreview(url)"
      >
        <q-img :src="url">
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot preview image
            </div>
          </template>
        </q-img>
        <q-btn
          class="absolute-top-right"
          icon="close"
          size="xs"
          color="black"
          text-color="white"
          round
          dense
          @click.stop="deleteImage(url)"
        />
      </div>
    </div>
    <q-dialog v-model="previewImage">
      <q-card style="min-width: 500px;">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="cancelPreview"
          />
        </q-card-section>

        <q-card-section>
          <q-img :src="previewURL" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    api: {
      type: String
    },
    maxFileSize: {
      type: [String, Number],
      default: "5120000" //5mb
    },
    maxFiles: {
      type: [Number, String],
      default: 1
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default:
        ".csv,.txt,.xls,.xlsx,.doc,.docx,.pdf,.dbf,.zip,.rar,.7z,.jpg,.png,.gif"
    },
    outlined: {
      type: Boolean,
      default: true
    },
    url: {
      type: [String, Array],
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      files: [],
      uploadedUrl: [
        // "https://www.rasello.com/images/rasellologo.png",
        // "data:image/png;base64,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",
        // "https://www.gamereactor.eu/media/71/_3557163.jpg"
      ],
      previewImage: false,
      previewURL: ""
    };
  },
  methods: {
    onInput(evt) {
      this.loading = true; // add loading state to submit button
      this.$loader.setLoading();
      this.emitValue();
      const formData = new FormData();

      if (this.files && this.files.length > 0) {
        for (let i = 0; i < this.files.length; i++) {
          formData.append("files[" + i + "]", this.files[i]);
        }
        this.$axios
          .post(this.api, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            this.loading = false;
            this.$loader.setLoading(false);
            if (response.data && response.data.url) {
              this.emitValue(response.data.url);
              Array.isArray[response.data.url]
                ? (this.uploadedUrl = response.data.url)
                : this.uploadedUrl.push(response.data.url);
            }
            this.$q.notify({
              color: "positive",
              message: `${this.files.length} file(s) uploaded`
            });
          })
          .catch(() => {
            this.loading = false;
            this.$loader.setLoading(false);
            this.emitValue("file");

            this.$q.notify({
              color: "negative",
              message: "Error occurred"
            });
          });
      }
    },

    onRejected(entries) {
      if (entries.length > 0) {
        switch (entries[0].failedPropValidation) {
          case "max-file-size":
            this.$q.notify({
              type: "negative",
              message: `File exceeds ${this.maxFileSize} size.`
            });

            break;

          case "max-files":
            this.$q.notify({
              type: "negative",
              message: `You can upload up to ${this.maxFiles} files.`
            });

            break;
        }
      }
    },
    onClear() {
      this.emitValue(undefined);
    },
    emitValue(val) {
      this.$emit("input", val);
    },
    showPreview(url) {
      this.previewUrl = url;
      this.previewImage = true;
    },
    cancelPreview(url) {
      this.previewImage = false;
      this.previewUrl = "";
    },
    deleteImage(url) {
      this.uploadedUrl = this.uploadedUrl.filter(item => item != url);
      this.emitValue(this.uploadedUrl.join(";"));
    }
  },
  mounted() {
    if (this.url) {
      Array.isArray[this.url]
        ? (this.uploadedUrl = this.url)
        : this.uploadedUrl.push(this.url);
    }
  }
};
</script>

<style>
.preview-img {
  min-height: 60px;
  width: 60px;
  cursor: pointer;
}
.preview-img .q-img {
  /* width: 60px; */
}
.preview-img-large {
  width: 600px;
}
</style>
