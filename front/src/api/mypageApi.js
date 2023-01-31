// import axios from 'axios';
import { authApi } from '../libs/axiosCofing';

const searchStudentApi = payload => {
  console.log(payload);
  return authApi.get(`therapist/searchStudent/${payload}`);
};
export { searchStudentApi };
