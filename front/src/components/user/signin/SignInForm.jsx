/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuth from '../../../hooks/queries/useAuth';

const schema = yup
  .object({
    id: yup.string().required('아이디를 입력해주세요.'),
    password: yup.string().required('비밀번호를 입력해주세요.'),
  })
  .required();
export default function SignInForm() {
  const { useSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSignIn = data => {
    useSignIn.mutate({ id: data.id, password: data.password });
  };
  const onFindId = () => {
    alert('아이디 찾기');
  };
  const onFindPassword = () => {
    alert('비밀번호 찾기');
  };
  return (
    <S.SignInForm onSubmit={handleSubmit(onSignIn)}>
      <S.Input {...register('id')} placeholder="아이디" />
      <S.ErrorMsg>{errors.id?.message}</S.ErrorMsg>
      <S.Input
        {...register('password')}
        type="password"
        placeholder="비밀번호"
      />
      <S.ErrorMsg>{errors.password?.message}</S.ErrorMsg>
      <S.FindBox>
        <button type="button" onClick={onFindId}>
          아이디 찾기
        </button>
        <span>|</span>
        <button type="button" onClick={onFindPassword}>
          비밀번호 찾기
        </button>
      </S.FindBox>
      <S.SignInButton type="submit">로그인</S.SignInButton>
    </S.SignInForm>
  );
}

const S = {
  SignInForm: styled.form`
    ${tw`py-10`}
  `,
  Input: styled.input`
    ${tw`block w-full bg-transparent outline-none border-2 rounded-md py-2 px-4 placeholder-slate-400 focus:border-brand`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
  FindBox: styled.div`
    ${tw`flex justify-end my-12 space-x-1 text-slate-400 font-bold text-xs`}
  `,
  SignInButton: styled.button`
    ${tw`bg-brand w-full py-2 px-4 rounded-md text-xl font-cafe24 text-white hover:bg-brandHover`}
  `,
};
