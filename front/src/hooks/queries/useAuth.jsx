import { useMutation } from '@tanstack/react-query';
import { signInApi } from '../../api/userApi';

export default function useAuth() {
  const useSignIn = useMutation(signInApi, {
    onMutate: variable => {
      console.log('onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: async (data, variables) => {
      console.log('success', data, variables);
      localStorage.setItem('token', data.data.accessToken);
    },
    onSettled: () => {
      console.log('end');
    },
  });
  return { useSignIn };
}
