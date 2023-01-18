/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function SignUpDocForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <div>
      <S.Header>치료사 회원가입</S.Header>

      <S.SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <S.Label htmlFor="name">치료사 이름</S.Label>
        <S.Input
          {...register('therapist_name', { required: true })}
          id="name"
        />
        {errors.therapist_name && <span>치료사 이름을 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="department">소속</S.Label>
        <S.Input
          {...register('therapist_department', { required: true })}
          id="department"
        />
        {errors.therapist_department && <span>소속을 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="id">아이디</S.Label>
        <S.Input {...register('therapist_id', { required: true })} id="id" />
        {errors.therapist_id && <span>아이디를 입력해주세요.</span>}
        <S.IdButton type="submit">중복ID</S.IdButton>
        <br />

        <S.Label htmlFor="password">비밀번호</S.Label>
        <S.Input
          {...register('therapist_password', { required: true })}
          id="password"
          type="password"
        />
        {errors.therapist_password && <span>비밀번호를 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="confirm_password">비밀번호 확인</S.Label>
        <S.Input
          {...register('confirm_password', {
            required: true,

            validate: value => {
              if (watch('therapist_password') !== value) {
                return alert('Your passwords do no match');
              }
            },
          })}
          id="confirm_password"
          type="password"
        />
        {errors.therapist_password2 && <span>비밀번호를 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="email">이메일</S.Label>
        <S.Input
          {...register('therapist_emil', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
          id="email"
          type="email"
        />
        {errors.therapist_emil && errors.email.message}
        <br />

        <S.Label htmlFor="phone">휴대폰번호</S.Label>
        <S.Input
          {...register('therapist_phone', { required: true })}
          id="phone"
        />
        {errors.therapist_phone && <span>휴대폰번호를 입력해주세요.</span>}
        <br />

        <S.SignUpButton type="submit">회원가입</S.SignUpButton>
      </S.SignUpForm>
    </div>
  );
}

const S = {
  SignUpForm: styled.form`
    ${tw`py-10`}
  `,
  Input: styled.input`
    ${tw`block w-full bg-transparent outline-none border-2 rounded-md py-2 px-4 mt-2 mb-2 placeholder-slate-400 focus:border-brand`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
  Label: styled.label`
    ${tw`font-extrabold text-xl text-center p-2`}
  `,
  Header: styled.h1`
    ${tw`font-extrabold text-2xl text-center pb-2 font-cafe24`}
  `,
  SignUpButton: styled.button`
    ${tw`bg-brand w-full mt-10 py-2 px-4 rounded-md text-xl font-cafe24 text-white hover:bg-brandHover`}
  `,
  IdButton: styled.button`
    ${tw`bg-brand text-white hover:bg-brandHover`}
  `,
};
