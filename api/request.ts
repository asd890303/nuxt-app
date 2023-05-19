import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { useContext } from "@nuxtjs/composition-api";

const { $axios } = useContext();
$axios.setHeader("Content-Type", "application/json");

const service = $axios.create({
  baseURL: "",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers!["x-test-header"] = "header";

    // if (Session.get('token')) {
    // 	config.headers!['Authorization'] = `${Session.get('token')}`;
    // }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code && res.code !== 0) {
      // todo
      return Promise.reject(service.interceptors.response);
    } else {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
