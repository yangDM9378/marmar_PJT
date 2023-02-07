import { authApi } from '../libs/axiosCofing';

// API to update student info

const deleteAccountApi = payload => {
  return authApi.delete(`${payload.status}/delete/${payload.password}`);
};

export { deleteAccountApi };
