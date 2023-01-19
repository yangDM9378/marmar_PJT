/* eslint-disable func-names */
/* eslint-disable consistent-return */
import { authApi } from '../libs/axiosCofing';

const signInApi = payload => authApi.post('auth/login', payload);
const userCheckApi = () =>
  authApi.get('users/me').then(res => {
    // console.log(res);
    return res.data;
  });

export { signInApi, userCheckApi };
