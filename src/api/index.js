import axios from 'axios'
import { baseUrl } from '@/config'
// import Vue from 'vue';
// import { Toast } from 'vant';
// Vue.use(Toast);

const http = axios.create({
  baseURL: baseUrl,
  timeout: 6000,
  headers: {
    'platformType': 3,
    'system': 4,
    "version": "2.0.0",
    'deviceChannel': 'gclife_bmp_pc',
    'X-NONDEC-SIGN': 'd940ad2021a66816effb60c56ce340bdaa99f157719b2c7350ca2536ea3207ba'
  }
})

// 添加请求拦截器
http.interceptors.request.use(
  config => {
    // if (config.needLoading) {
    //   Toast.loading({
    //     message: '请稍候',
    //     forbidClick: true,
    //     duration: 0
    //   });
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  response => {
    // if (response.config.needLoading) {
    //   Toast.clear()
    // }
    return response
  },
  error => {
    // Toast.clear();
    // Toast.fail("请求超时");
    return Promise.reject(error);
  }
)

export default http
