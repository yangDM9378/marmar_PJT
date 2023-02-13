// import axios from 'axios';
import { authApi } from '../libs/axiosCofing';

const searchStudentApi = payload => {
  // console.log(payload);
  return authApi.get(`therapist/searchStudent/${payload}`);
};
const registerStudentApi = payload => {
  return authApi.put(`student/selectTherapist/${payload}`);
};
const getRegisteredStudentApi = () => {
  return authApi.get('therapist/mypage/studentList');
};
const delRegisteredStudentApi = payload => {
  return authApi.put(`student/deleteTherapist/${payload}`);
};
const getResultApi = async payload => {
  return authApi.get(`student/evaluation/result/${payload}`);
};
const getResultDailyApi = (num, date) => {
  return authApi.post(`student/mypage/evaluation/result/${num}`, { date });
};

export {
  searchStudentApi,
  registerStudentApi,
  getRegisteredStudentApi,
  delRegisteredStudentApi,
  getResultApi,
  getResultDailyApi,
};
