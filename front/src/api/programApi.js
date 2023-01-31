/* eslint-disable func-names */
/* eslint-disable consistent-return */

import axios from 'axios';

const getWordApi = payload => axios.get(`program/word/${payload}`);

const getClockApi = payload => axios.get(`program/clock/${payload}`);

export { getWordApi, getClockApi };
