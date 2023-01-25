/* eslint-disable func-names */
/* eslint-disable consistent-return */

import axios from 'axios';
import { authApi } from '../libs/axiosCofing';

const signInApi = payload => authApi.post('auth/login', payload);

const studentCheckApi = () =>
  authApi('student/me').then(res => {
    // console.log(res);
    return res.data;
  });

const therapistCheckApi = () =>
  authApi('therapist/me').then(res => {
    // console.log(res);
    return res.data;
  });

const signUpTherapistApi = payload => axios.post('therapist', payload);

const signUpStudentApi = payload => axios.post('student', payload);

const idCheckTherapistApi = payload => axios.get(`users/${payload}`);

const idCheckStudentApi = payload => axios.get(`users/${payload}`);

export {
  signInApi,
  studentCheckApi,
  therapistCheckApi,
  signUpTherapistApi,
  signUpStudentApi,
  idCheckTherapistApi,
  idCheckStudentApi,
};
