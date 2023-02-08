/* eslint-disable no-return-await */
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

const headers = {
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  Accept: '*/*'
}

const signUpTherapistApi = payload => axios.post('therapist', payload);

const signUpStudentApi = payload => authApi.post('student', payload);

const idCheckTherapistApi = payload => axios.get(`therapist/${payload}`);

const idCheckStudentApi = payload => axios.get(`student/${payload}`);

const findIdApi = async payload => {
  const check = await authApi.post('auth/check/findId', payload);
  if (check.data === true) {
    return await axios.post('auth/check/findId/showId', payload);
  }
  return false;

  // axios.get('url', paylaod);
};

const findPwApi = async payload => {
  const check = await authApi.post('auth/check/findPw', payload);
  if (check.data === true) {
    return await axios.post('auth/check/findPw/sendEmail', payload);
  }
  return false;
  // axios.get('url', paylaod);
};

export {
  signInApi,
  studentCheckApi,
  therapistCheckApi,
  signUpTherapistApi,
  signUpStudentApi,
  idCheckTherapistApi,
  idCheckStudentApi,
  findIdApi,
  findPwApi,
};
