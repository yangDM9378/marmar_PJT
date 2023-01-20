/* eslint-disable func-names */
/* eslint-disable consistent-return */

import axios from 'axios';
import { authApi } from '../libs/axiosCofing';

const signInApi = payload => authApi.post('auth/login', payload);

const userCheckApi = () =>
  authApi.get('users/me').then(res => {
    // console.log(res);
    return res.data;
  });

const signUpTherapistApi = payload => axios.post('therapist', payload);

const signUpStudentApi = payload => axios.post('student', payload);

const idCheckTherapistApi = payload => axios.get(`users/${payload}`);

const idCheckStudentApi = payload => axios.get(`users/${payload}`);

export {
  signInApi,
  userCheckApi,
  signUpTherapistApi,
  signUpStudentApi,
  idCheckTherapistApi,
  idCheckStudentApi,
};
