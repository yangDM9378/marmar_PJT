import { authApi } from '../libs/axiosCofing';

// API to update student info

const deleteAccountApi = payload => {
  console.log(`${payload.status}/delete`, payload.password);
  return authApi.delete(`${payload.status}/delete`, payload.password);
};

export { deleteAccountApi };
