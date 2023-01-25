/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  signInApi,
  studentCheckApi,
  therapistCheckApi,
} from '../../api/userApi';

export default function useAuth() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const [isLogin, setIsLogin] = useState(false);
  const [student, setStudent] = useState(true);
  const [therapist, setTherapist] = useState(true);

  const useSignIn = useMutation(signInApi, {
    onMutate: variable => {
      console.log('onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables) => {
      console.log('success', data, variables);
      localStorage.setItem('token', data.data.accessToken);
      client.invalidateQueries(['useStudentCheck']);
      client.invalidateQueries(['useTherapistCheck']);
      navigate('/');
    },
    onSettled: () => {
      console.log('end');
    },
  });

  const useStudentCheck = () =>
    useQuery({
      queryKey: ['useStudentCheck'],
      queryFn: studentCheckApi,
      enabled: isLogin && student,
      onSuccess: () => {
        localStorage.setItem('student', 'student');
      },
      retry: false,
    });

  const useTherapistCheck = () =>
    useQuery({
      queryKey: ['useTherapistCheck'],
      queryFn: therapistCheckApi,
      enabled: isLogin && therapist,
      onSuccess: () => {
        localStorage.setItem('therapist', 'therapist');
      },
      retry: false,
    });

  const useLogOut = () => {
    // localStorage.removeItem('token');
    localStorage.clear();
    client.setQueryData(['useStudentCheck'], null);
    client.setQueryData(['useTherapistCheck'], null);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogin(true);
    }
  }, [useSignIn]);

  useEffect(() => {
    if (localStorage.getItem('therapist')) {
      setStudent(false);
    }
  }, [useTherapistCheck]);

  useEffect(() => {
    if (localStorage.getItem('student')) {
      setTherapist(false);
    }
  }, [useStudentCheck]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsLogin(false);
    }
  }, [useLogOut]);
  return { useSignIn, useStudentCheck, useTherapistCheck, useLogOut };
}
