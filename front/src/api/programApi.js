/* eslint-disable func-names */
/* eslint-disable consistent-return */

import axios from 'axios';
import { authApi } from '../libs/axiosCofing';

const getWordApi = payload => {
  return axios.get(`program/practice/word/${payload}`);
};
const getClockApi = payload => {
  return axios.get(`program/practice/clock/${payload}`);
};
const getPictureApi = payload => {
  return axios.get(`program/practice/picture/${payload}`);
};
const getQuestionApi = payload => {
  return axios.post('program/game/select', payload);
};
const searchClassStudentApi = payload => {
  return authApi.get(`room/searchStudent/${payload}`);
};

export {
  getWordApi,
  getClockApi,
  getPictureApi,
  getQuestionApi,
  searchClassStudentApi,
};
