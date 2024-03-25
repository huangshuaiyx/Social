import axios from "axios";
import Vue from "vue";
import { Toast } from "vant";
import { baseUrl } from "../config/index";

Vue.use(Toast);

const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    if (config.needLoading) {
      Toast.loading({
        message: "please wait a moment",
        forbidClick: true,
        duration: 0,
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.config.needLoading) {
      Toast.clear();
    }
    return response;
  },
  (error) => {
    Toast.clear();
    return Promise.reject(error);
  }
);

export default http;
