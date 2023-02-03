import { authApi } from '../libs/axiosCofing';

const makeRoomApi = payload => {
  return authApi.put(`room/makeroom`, payload);
};
const closeRoomApi = payload => {
  return authApi.put(`room/endroom/${payload}`);
};

const getTeacherApi = () => {
  return authApi.get('room/enter/student');
};

export { makeRoomApi, getTeacherApi, closeRoomApi };
