import { authApi } from '../libs/axiosCofing';

const makeRoomApi = payload => {
  return authApi.put(`room/makeroom`, payload);
};

export { makeRoomApi };
