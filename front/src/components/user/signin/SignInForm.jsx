/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
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
  const [isFail, setIsFail] = useState(false);
  const { useSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSignIn = data => {
    useSignIn.mutate(
      { id: data.id, password: data.password },
      {
        onError: error => {
          setIsFail(true);
        },
      },
    );
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
      <S.LoginFailMsg className={`${isFail ? '' : 'hidden'}`}>
        아이디 또는 비밀번호를 잘못 입력했습니다.
        <br />
        입력하신 내용을 다시 확인해주세요.
      </S.LoginFailMsg>
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
  LoginFailMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
  SignInButton: styled.button`
    ${tw`bg-brand w-full py-2 px-4 rounded-md text-xl font-cafe24 text-white hover:bg-brandHover`}
  `,
};
