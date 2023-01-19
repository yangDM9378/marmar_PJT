/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function SignUpStudentForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div>
      <S.Header>사용자 회원가입</S.Header>
      <div>
        마르마르와 연결된 기관의 <h3>치료사 정보를 기반</h3>으로 치료사의 정보를
        입력 바랍니다.
      </div>
      <S.SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <S.Label htmlFor="name_helper">보호자 이름</S.Label>
        <S.Input
          {...register('name_helper', {
            required: '보호자 이름을 입력해주세요.',
          })}
          id="name_helper"
        />
        {errors.name_helper && errors.name_helper.message}
        <br />

        <S.Label htmlFor="name">아이 이름</S.Label>
        <S.Input
          {...register('name', {
            required: '아이 이름을 입력해주세요.',
          })}
          id="name"
        />
        {errors.name && errors.name.message}
        <br />

        <S.Label htmlFor="id">아이디</S.Label>
        <S.Input
          {...register('id', { required: '아이디를 입력해주세요.' })}
          id="id"
        />
        {errors.id && errors.id.message}
        <S.IdButton type="submit">중복ID</S.IdButton>
        <br />

        <S.Label htmlFor="password">비밀번호</S.Label>
        <S.Input
          id="password"
          type="password"
          placeholder="특수문자, 영문, 숫자를 혼용하여 8~16자를 입력해주세요."
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value:
                /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
              message: '특수문자, 영문, 숫자를 혼용하여 8~16자를 입력해주세요.',
            },
            minLength: {
              value: 8,
              message: '최소 8자 이상의 비밀번호를 입력해주세요.',
            },
            maxLength: {
              value: 16,
              message: '16자 이하의 비밀번호만 사용가능합니다.',
            },
          })}
        />
        {errors.password && errors.password.message}
        <br />

        <S.Label htmlFor="confirm_password">비밀번호 확인</S.Label>
        <S.Input
          id="confirm_password"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register('confirm_password', {
            required: '비밀번호를 입력해주세요.',
            validate: {
              matchsPreviousPassword: value => {
                const { password } = getValues();
                return password === value || '비밀번호가 일치하지 않습니다.';
              },
            },
          })}
        />
        {errors.confirm_password && errors.confirm_password.message}
        <br />

        <S.Label htmlFor="password_helper">2차 비밀번호</S.Label>
        <S.Input
          id="password_helper"
          type="password"
          placeholder="숫자 4자리를 입력해주세요."
          {...register('password_helper', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 4,
              message: '최소 4자 이상의 비밀번호를 입력해주세요.',
            },
            maxLength: {
              value: 4,
              message: '4자 이하의 비밀번호만 사용가능합니다.',
            },
          })}
        />
        {errors.password_helper && errors.password_helper.message}
        <br />

        <S.Label htmlFor="emailId">이메일</S.Label>
        <S.Input
          {...register('emailId', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
          id="emailId"
          type="emailId"
        />
        {errors.emailId && errors.emailId.message}
        <br />

        <S.Label htmlFor="phone">휴대폰번호</S.Label>
        <S.Input
          {...register('phone', { required: '휴대폰번호를 입력해주세요.' })}
          id="phone"
        />
        {errors.phone && errors.phone.message}
        <br />

        <S.Label htmlFor="birth">생년월일</S.Label>
        <S.Input
          {...register('birth', { required: '생년월일을 입력해주세요.' })}
          id="birth"
          type="date"
        />
        {errors.birth && errors.birth.message}

        <S.SignUpButton type="submit" onSubmit="OnSubmit">
          회원가입
        </S.SignUpButton>
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
