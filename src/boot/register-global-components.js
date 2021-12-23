import Vue from "vue";

import RForm from "../components/organisms/RForm.vue";
import RList from "../components/organisms/RList.vue";
import TitleContainer from "../components/molecules/TitleContainer.vue";
import RDateTime from "../components/molecules/RDateTime.vue";
import RUploader from "../components/molecules/RUploader.vue";
import VueGates from "vue-gates";
import store from "../store/index";

// TODO: change super_admin to constant.
Vue.use(VueGates, {
  superRole: "super_admin"
});
import {
  QBtn,
  QInput,
  QBtnDropdown,
  QSelect,
  QForm,
  QField,
  QDate,
  QTime,
  QFile,
  QToggle,
  QOptionGroup
} from "quasar";
import RSelect from "src/components/molecules/RSelect";

Vue.prototype.$loader = {
  setLoading: async (val = true) => {
    if (val) {
      await store.dispatch("loader/setLoading");
    } else {
      await store.dispatch("loader/removeLoading");
    }
  }
};

Vue.component("QBtn", QBtn);
Vue.component("QBtnDropdown", QBtnDropdown);
Vue.component("QSelect", QSelect);
Vue.component("QInput", QInput);
Vue.component("QField", QField);
Vue.component("QForm", QForm);
Vue.component("QDate", QDate);
Vue.component("QTime", QTime);
Vue.component("QFile", QFile);
Vue.component("QToggle", QToggle);
Vue.component("QOptionGroup", QOptionGroup);

Vue.component("r-form", RForm);
Vue.component("r-list", RList);
Vue.component("title-container", TitleContainer);
Vue.component("r-select", RSelect);
Vue.component("r-date-time", RDateTime);
Vue.component("r-uploader", RUploader);
