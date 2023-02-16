import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  stuModPasswordApi,
  stuModPasswordHelperApi,
  stuModNameApi,
  stuModNameHelperApi,
  stuModPhoneApi,
  stuModBirthApi,
  theModPasswordApi,
  theModNameApi,
  theModPhoneApi,
  theModDepartmentApi,
} from '../../api/modifyInfoApi';
import useAuth from './useAuth';

export default function useModify() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();

  const useModPassword = useMutation(
    student ? stuModPasswordApi : theModPasswordApi,
    {
      onMutate: variable => {
        // console.log('onMutate', variable);
      },
      onSuccess: async (data, variables) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `비밀번호가 변경되었습니다.`,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      onError: (error, variable, context) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `비밀번호 변경에 실패했습니다.`,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      onSettled: () => {
        // console.log('end');
      },
    },
  );

  const useModPasswordHelper = useMutation(stuModPasswordHelperApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `2차 비밀번호가 변경되었습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error, variable, context) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `2차 비밀번호 변경에 실패했습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  const useModName = useMutation(student ? stuModNameApi : theModNameApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `이름이 변경되었습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error, variable, context) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `이름 변경에 실패했습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  const useStuModNameHelper = useMutation(stuModNameHelperApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `전화번호 변경되었습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error, variable, context) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `전화번호 변경에 실패했습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  const useModPhone = useMutation(student ? stuModPhoneApi : theModPhoneApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `전화번호 변경되었습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error, variable, context) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `전화번호 변경에 실패했습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  const useModBirth = useMutation(stuModBirthApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `생년월일 정보가 변경되었습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error, variable, context) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `생년월일 정보가 변경에 실패했습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  const useTheModDepartment = useMutation(theModDepartmentApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `소속 기관이 변경되었습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error, variable, context) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `소속 기관 변경에 실패했습니다.`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  return {
    useModPassword,
    useModPasswordHelper,
    useModName,
    useStuModNameHelper,
    useModPhone,
    useModBirth,
    useTheModDepartment,
  };
}
