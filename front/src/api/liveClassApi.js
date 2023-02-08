import { authApi } from '../libs/axiosCofing';

const makeRoomApi = payload => {
  return authApi.put(`room/makeroom/${payload.studentNum}`);
};
const closeRoomApi = payload => {
  return authApi.put(`room/endroom/${payload}`);
};

const getTeacherApi = () => {
  return authApi.get('room/enter/student');
};

const evaluateApi = payload => {
  return authApi.post(`student/evaluation/${payload.studentNum}`, payload);
};

export { makeRoomApi, getTeacherApi, closeRoomApi, evaluateApi };
