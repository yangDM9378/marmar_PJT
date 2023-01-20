import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signUpTherapistApi, signUpStudentApi } from '../../api/userApi';

export default function useSingUp() {
  const navigate = useNavigate();

  const useSignUpTherapist = useMutation(signUpTherapistApi, {
    onMutate: variable => {
      console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      console.log('success', data, variables);
      navigate('/SignIn');
    },
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSettled: () => {
      console.log('end');
    },
  });

  const useSignUpStudent = useMutation(signUpStudentApi, {
    onMutate: variable => {
      console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      console.log('success', data, variables);
      navigate('/SignIn');
    },
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSettled: () => {
      console.log('end');
    },
  });

  return { useSignUpTherapist, useSignUpStudent };
}
