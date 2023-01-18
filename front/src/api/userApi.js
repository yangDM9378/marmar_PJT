import { authApi } from '../libs/axiosCofing';

// const signInApi = async payload => {
//   const response = await authApi.post('/auth/login', payload);
//   return response;
// };

const signInApi = payload => authApi.post('auth/login', payload);
const getUserApi = () =>
  authApi.get('users/me').then(res => {
    console.log(res.data);
    return res.data;
  });

export { signInApi, getUserApi };
