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
  const [go, setGo] = useState(false);
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
      localStorage.removeItem('token');
      localStorage.removeItem('student');
      localStorage.removeItem('therapist');
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
      onSuccess: data => {
        localStorage.setItem('student', 'student');
        // console.log(data);
        if (data.ongoing) {
          setGo(true);
          // console.log(go);
        } else if (!data.ongoing) {
          // console.log(go);
          setGo(false);
        }
      },
      onError: () => {
        localStorage.removeItem('student');
      },
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
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
      onError: () => {
        localStorage.removeItem('therapist');
      },
      retry: false,
    });

  const useLogOut = () => {
    // localStorage.removeItem('token');
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    localStorage.removeItem('therapist');
    client.setQueryData(['useStudentCheck'], null);
    client.setQueryData(['useTherapistCheck'], null);
    navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogin(true);
      setStudent(true);
      setTherapist(true);
    }
  }, [useSignIn]);

  useEffect(() => {
    if (
      !localStorage.getItem('therapist') &&
      !localStorage.getItem('student')
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('student');
      localStorage.removeItem('therapist');
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('therapist')) {
      setStudent(false);
      setIsLogin(true);
    }
  }, [useTherapistCheck]);

  useEffect(() => {
    if (localStorage.getItem('student')) {
      setTherapist(false);
      setIsLogin(true);
    }
  }, [useStudentCheck]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsLogin(false);
    }
  }, [useLogOut]);
  return {
    useSignIn,
    useStudentCheck,
    useTherapistCheck,
    useLogOut,
    go,
  };
}
