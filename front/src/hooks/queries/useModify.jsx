import { useMutation } from '@tanstack/react-query';
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
        // console.log('success', data, variables);
      },
      onError: (error, variable, context) => {
        // console.log(error);
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
      // console.log('success', data, variables);
    },
    onError: (error, variable, context) => {
      // console.log(error);
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
      // console.log('success', data, variables);
    },
    onError: (error, variable, context) => {
      // console.log(error);
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
      // console.log('success', data, variables);
    },
    onError: (error, variable, context) => {
      // console.log(error);
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
      // console.log('success', data, variables);
    },
    onError: (error, variable, context) => {
      // console.log(error);
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
      // console.log('success', data, variables);
    },
    onError: (error, variable, context) => {
      // console.log(error);
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
      // console.log('success', data, variables);
    },
    onError: (error, variable, context) => {
      // console.log(error);
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
