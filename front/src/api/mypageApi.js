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
  return authApi.put(`student/selectTherapist/${payload}`);
};

export {
  searchStudentApi,
  registerStudentApi,
  getRegisteredStudentApi,
  delRegisteredStudentApi,
};
