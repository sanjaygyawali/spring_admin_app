import axios from "axios";
import Vue from "vue";
// import { createApp } from 'vue'
import { Notify } from "quasar";

const baseURL = process.env.API_URL;
const instance = axios.create({
  baseURL
});

const getConfig = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
};

let isRefreshing = false;
let pendingRequests = [];

function addPendingRequests(cb) {
  pendingRequests.push(cb);
}

function onRefreshed() {
  pendingRequests.map(cb => cb());
}

instance.interceptors.response.use(
  response => {
    if (!response.data) {
      // Notify.create({
      //   type: 'negative',
      //   message: response.data.message
      // })
      throw response;
    }
    return response;
  },
  async error => {
    const { config, response } = error;
    console.log("error", { error });
    if (!response) {
      console.log(!response);
      return Promise.reject({
        error: {
          message:
            "Cannot process request at the moment. Please try again later."
        },
        ...error
      });
    }

    if (
      response.status === 401 &&
      response.data &&
      response.data.error &&
      response.data.error.message.toLowerCase() == "token_expired"
    ) {
      const originalRequest = config;
      let newTokens = null;
      if (!isRefreshing) {
        try {
          isRefreshing = true;
          newTokens = await Vue.prototype.authService.updateToken();
          if (newTokens) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newTokens.accessToken}`;
          }
        } catch (err) {
          if (err.error.message === "refresh_token_expired") {
            await Vue.prototype.authService.logout();
          } else {
            console.log("cannot refresh token");
          }
        } finally {
          isRefreshing = false;
        }
      }

      const requestPendingRequest = new Promise(resolve => {
        addPendingRequests(() => {
          resolve(axios(originalRequest));
        });
      });

      onRefreshed();
      pendingRequests = [];
      return requestPendingRequest;
    } else if (response.status == 401) {
      await Vue.prototype.authService.logout();
    }
    // todo
    const errorData = response;
    if (errorData.error && errorData.error.message) {
      Notify.create({
        type: "negative",
        message: errorData.message || errorData.error
      });
    }
    // return response;
    return Promise.reject(response.data);
  }
);

const axiosApi = {
  setBaseUrl: function(baseURL) {
    instance.defaults.baseURL = baseURL;
  },
  get: async function(target, payload) {
    const config = getConfig();
    let result = await instance.get(target, config);
    return result.data;
  },
  // $get to maintain params payload.
  $get: async function(target, payload) {
    const config = Object.assign(getConfig(), { params: payload });
    let result = await instance.get(target, config);
    return result.data;
  },
  post: async function(target, payload, options = {}) {
    const config = getConfig();
    Object.assign(config.headers, options.headers);
    let result = await instance.post(target, payload, config);
    return result.data;
  },
  put: async function(target, payload, options = {}) {
    const config = getConfig();
    Object.assign(config.headers, options.headers);
    let result = await instance.put(target, payload, config);
    return result.data;
  },
  delete: async function(target) {
    return instance.delete(target, getConfig());
  },
  $delete: async function(target, payload) {
    const config = Object.assign(getConfig(), { params: payload });
    let result = await instance.delete(target, config);
    return result.data;
  },
  baseURL,
  instance
};
// const app = createApp({})
// app.config.globalProperties.$axios = instance // vue 3 equivalent to vue.prototype
Vue.prototype.$axios = axiosApi;

export default axiosApi;
