/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import { deleteAccountApi } from '../../api/deleteAccountApi';
import useAuth from './useAuth';

export default function useDelete() {
  const { useLogOut } = useAuth();
  const useDeleteAccount = useMutation(deleteAccountApi, {
    onMutate: variable => {
      console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      console.log('success', data, variables);
      alert('그동안 마르마르를 이용해주셔서 감사합니다.');
      useLogOut();
    },
    onError: (error, variable, context) => {
      alert('비밀번호를 다시 입력해주세요!');
    },
    onSettled: () => {
      console.log('end');
    },
  });
  return { useDeleteAccount };
}
