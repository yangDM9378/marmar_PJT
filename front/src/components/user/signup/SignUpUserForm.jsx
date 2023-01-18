/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function SignUpDocForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <div>
      <S.Header>사용자 회원가입</S.Header>
      <div>
        마르마르와 연결된 기관의 <span>치료사 정보를 기반</span>으로 치료사의
        정보를 입력 바랍니다.
      </div>
      <S.SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <S.Label htmlFor="name_helper">보호자 이름</S.Label>
        <S.Input
          {...register('student_name_helper', { required: true })}
          id="name_helper"
        />
        {errors.student_name_helper && <span>보호자 이름을 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="name">아이 이름</S.Label>
        <S.Input {...register('student_name', { required: true })} id="name" />
        {errors.student_name && <span>아이 이름을 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="id">아이디</S.Label>
        <S.Input {...register('student_id', { required: true })} id="id" />
        {errors.student_id && <span>아이디를 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="password">비밀번호</S.Label>
        <S.Input
          {...register('student_password', { required: true })}
          id="password"
        />
        {errors.student_password && <span>비밀번호를 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="confirm_password">비밀번호 확인</S.Label>
        <S.Input
          {...register('confirm_password', { required: true })}
          id="confirm_password"
        />
        {errors.student_password2 && <span>비밀번호를 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="password_helper">2차 비밀번호</S.Label>
        <S.Input
          {...register('student_password_helper', { required: true })}
          id="password_helper"
        />
        {errors.student_password_helper && (
          <span>2차 비밀번호를 입력해주세요.</span>
        )}
        <br />

        <S.Label htmlFor="email">이메일</S.Label>
        <S.Input
          {...register('student_email', { required: true })}
          id="email"
        />
        {errors.student_email && <span>이메일을 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="phone_helper">휴대폰번호</S.Label>
        <S.Input
          {...register('student_phone_helper', { required: true })}
          id="phone_helper"
        />
        {errors.student_phone_helper && <span>휴대폰번호를 입력해주세요.</span>}
        <br />

        <S.Label htmlFor="birth">생년월일</S.Label>
        <S.Input
          {...register('student_birth', { required: true })}
          id="birth"
          type="date"
        />
        {errors.student_birth && <span>생년월일을 입력해주세요.</span>}

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
};
