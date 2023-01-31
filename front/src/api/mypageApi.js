import axios from 'axios';
// import { authApi } from '../libs/axiosCofing';

const searchStudentApi = payload =>
  axios.get(`therapist/searchStudent/${payload}`);
export { searchStudentApi };
