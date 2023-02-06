/* eslint-disable func-names */
/* eslint-disable consistent-return */

import axios from 'axios';

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
  console.log(payload);
  return axios.post('program/game/select', payload);
};

export { getWordApi, getClockApi, getPictureApi, getQuestionApi };
