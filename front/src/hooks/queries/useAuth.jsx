import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userCheckApi, signInApi } from '../../api/userApi';

export default function useAuth() {
  const navigate = useNavigate();
  const client = useQueryClient();
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
      client.invalidateQueries(['useUserCheck']);
      navigate('/');
    },
    onSettled: () => {
      console.log('end');
    },
  });
  const useUserCheck = () =>
    useQuery({
      queryKey: ['useUserCheck'],
      queryFn: userCheckApi,
    });

  const useLogOut = () => {
    localStorage.removeItem('token');
    client.setQueryData(['useUserCheck'], null);
  };
  return { useSignIn, useUserCheck, useLogOut };
}
