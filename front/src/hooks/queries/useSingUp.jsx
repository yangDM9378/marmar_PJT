import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signUpTherapistApi, signUpStudentApi } from '../../api/userApi';

export default function useSingUp() {
  const navigate = useNavigate();

  const useSignUpTherapist = useMutation(signUpTherapistApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      // console.log('success', data, variables);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '회원가입에 성공했습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/SignIn');
    },
    onError: (error, variable, context) => {
      // console.log(error);
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  const useSignUpStudent = useMutation(signUpStudentApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '회원가입에 성공했습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/SignIn');
    },
    onError: (error, variable, context) => {
      // console.log(error);
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  return { useSignUpTherapist, useSignUpStudent };
}
