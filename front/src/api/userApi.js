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

const signUpTherapistApi = payload => axios.post('auth/signup', payload);

const signUpStudentApi = payload => axios.post('auth/signup', payload);

const idCheckApi = payload => axios.post(`auth/signup/${payload}`);

export {
  signInApi,
  userCheckApi,
  signUpTherapistApi,
  signUpStudentApi,
  idCheckApi,
};
