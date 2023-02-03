/* eslint-disable func-names */
/* eslint-disable consistent-return */

import axios from 'axios';

const getWordApi = payload => {
  return axios.get(`program/word/${payload}`);
};
const getClockApi = payload => {
  return axios.get(`program/clock/${payload}`);
};
const getQuestionApi = payload => {
  return axios.post('program/select/game', payload);
};

export { getWordApi, getClockApi, getQuestionApi };
