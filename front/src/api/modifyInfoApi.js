import { authApi } from '../libs/axiosCofing';

// API to update student info
const S = 'student/modify';

const stuModPasswordApi = payload => {
  console.log(payload, 'student');
  return authApi.put(`${S}/Password`, payload);
};

const stuModPasswordHelperApi = payload => {
  return authApi.put(`${S}/PasswordHelper`, payload);
};

const stuModNameApi = payload => {
  return authApi.put(`${S}/${payload.check}`, payload);
};

const stuModNameHelperApi = payload => {
  return authApi.put(`${S}/nameHelper`, payload);
};

const stuModPhoneApi = payload => {
  return authApi.put(`${S}/phone`, payload);
};

const stuModBirthApi = payload => {
  return authApi.put(`${S}/birth`, payload);
};

// API to update therapist info
const T = 'therapist/modify';

const theModPasswordApi = payload => {
  return authApi.put(`${T}/Password`, payload);
};

const theModNameApi = payload => {
  return authApi.put(`${T}/name`, payload);
};

const theModPhoneApi = payload => {
  return authApi.put(`${T}/phone`, payload);
};

const theModDepartmentApi = payload => {
  return authApi.put(`${T}/department`, payload);
};

export {
  // student
  stuModPasswordApi,
  stuModPasswordHelperApi,
  stuModNameApi,
  stuModNameHelperApi,
  stuModPhoneApi,
  stuModBirthApi,
  // therapist
  theModPasswordApi,
  theModNameApi,
  theModPhoneApi,
  theModDepartmentApi,
};
