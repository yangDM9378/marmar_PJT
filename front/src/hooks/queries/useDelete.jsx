import { useMutation } from '@tanstack/react-query';
import { deleteAccountApi } from '../../api/deleteAccountApi';

export default function useDelete() {
  const useDeleteAccount = useMutation(deleteAccountApi, {
    onMutate: variable => {
      console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      console.log('success', data, variables);
    },
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSettled: () => {
      console.log('end');
    },
  });
  return { useDeleteAccount };
}
