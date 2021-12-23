import Vue from "vue";
import axios from "../boot/axios";
import user from "../api/user";
import repository from "./repository";
import resources from "../store/resource";

export default async ({ app, router, store }) => {
  Vue.prototype.$api = {};

  //   const files = require.context("../api/", true, /\.js$/i);
  //   files.keys().map(key => {
  //     const name = key.replace(".js", "").replace("./", "");
  //     console.log(name);
  //     const a = [files(key)][0];
  //     console.log("file", a);
  //     // Vue.prototype.$api[name] = a(axios);
  //   });
  Vue.prototype.$user = user(axios);
  const repositoryWithAxios = repository(axios);
  resources.forEach(element => {
    Vue.prototype.$api[element] = repositoryWithAxios(element);
  });
};
