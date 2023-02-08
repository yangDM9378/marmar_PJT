/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
// axiosConfig
import axios from 'axios';

const BASE_URL = 'http://i8c204.p.ssafy.io:8080/api/v1';

axios.defaults.baseURL = BASE_URL;
// // 리소스 접근 허용
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// // 서로 다른 도메인간 쿠키 전달 허용
// axios.defaults.withCredentials = true;

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    const token = localStorage.getItem('token');

    if (token !== 'undefined') {
      config.headers.Authorization = token ? `Bearer ${token}` : null;
    }
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
