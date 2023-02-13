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
  return authApi.put(`student/evaluation/${payload.studentNum}`, {
    evalAbility: payload.evalAbility,
    evalAttitude: payload.evalAttitude,
    evalConcentration: payload.evalConcentration,
    comments: payload.comments,
  });
};

export { makeRoomApi, getTeacherApi, closeRoomApi, evaluateApi };
