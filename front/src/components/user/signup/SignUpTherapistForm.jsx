/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'twin.macro';
import useSingUp from '../../../hooks/queries/useSingUp';
import {
  idCheckTherapistApi,
  emailCheckTherapistApi,
} from '../../../api/userApi';

export default function SignUpTherapistForm() {
  const { useSignUpTherapist } = useSingUp();
  const [registerdId, setRegisteredId] = useState(true);
  const [registerdEmail, setRegisteredEmail] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onRegister = data => {
    if (registerdId || registerdEmail) {
      alert('중복확인이 되지 않았습니다.');
    } else {
      useSignUpTherapist.mutate({
        id: data.id,
        password: data.password,
        name: data.name,
        phone: data.phone,
        department: data.department,
        email: data.email,
      });
      setRegisteredId(true);
      setRegisteredEmail(true);
    }
  };

  const onCheckId = async id => {
    console.log(id);
    const response = await idCheckTherapistApi(id);
    if (!response.data) {
      alert('중복 아이디입니다.');
    } else {
      alert('사용가능한 아이디입니다.');
      setRegisteredId(false);
    }
  };

  const onCheckEmail = async email => {
    console.log(email);
    const response = await emailCheckTherapistApi(email);
    if (!response.data) {
      alert('이미 사용중인 이메일입니다.');
    } else {
      alert('사용가능한 이메일입니다.');
      setRegisteredEmail(false);
    }
  };

  return (
    <S.SignUpSection>
      <S.Header>치료사 회원가입</S.Header>
      <S.SignUpForm onSubmit={handleSubmit(onRegister)}>
        <S.Label htmlFor="name">치료사 이름</S.Label>
        <S.Input
          {...register('name', { required: '치료사 이름을 입력해주세요.' })}
          id="name"
        />
        <S.ErrorMsg>{errors.name && errors.name.message}</S.ErrorMsg>
        <br />

        <S.Label htmlFor="department">소속</S.Label>
        <S.Input
          {...register('department', { required: '소속을 입력해주세요.' })}
          id="department"
        />
        <S.ErrorMsg>
          {errors.department && errors.department.message}
        </S.ErrorMsg>
        <br />

        <S.Label htmlFor="id">아이디</S.Label>
        <S.InputBox>
          <S.Input
            {...register('id', {
              required: '아이디를 입력해주세요',
              minLength: {
                value: 5,
                message: '최소 5자 이상의 아이디를 입력해주세요.',
              },
              maxLength: {
                value: 12,
                message: '12자 이하의 아이디만 사용가능합니다.',
              },
            })}
            id="id"
          />
          <S.RegisteredButton
            type="button"
            onClick={() => onCheckId(getValues('id'))}
          >
            중복확인
          </S.RegisteredButton>
        </S.InputBox>
        <S.ErrorMsg>{errors.id && errors.id.message}</S.ErrorMsg>
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
        <S.ErrorMsg>{errors.password && errors.password.message}</S.ErrorMsg>
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
        <S.ErrorMsg>
          {errors.confirm_password && errors.confirm_password.message}
        </S.ErrorMsg>
        <br />

        <S.Label htmlFor="email">이메일</S.Label>
        <S.InputBox>
          <S.Input
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '유효한 이메일이 아닙니다.',
              },
            })}
            id="email"
            type="email"
          />
          <S.RegisteredButton
            type="button"
            onClick={() => onCheckEmail(getValues('email'))}
          >
            중복확인
          </S.RegisteredButton>
        </S.InputBox>
        <S.ErrorMsg>{errors.id && errors.id.message}</S.ErrorMsg>
        <br />

        <S.Label htmlFor="phone">휴대폰번호</S.Label>
        <S.Input
          {...register('phone', { required: '휴대폰번호를 입력해주세요.' })}
          id="phone"
        />
        <S.ErrorMsg>{errors.phone && errors.phone.message}</S.ErrorMsg>
        <S.SignUpButton type="submit">회원가입</S.SignUpButton>
      </S.SignUpForm>
    </S.SignUpSection>
  );
}

const S = {
  // SignUpSection: styled.div`
  //   ${tw`mt-8`}
  // `,
  // SignUpForm: styled.form`
  //   ${tw`py-3`}
  // `,
  SignUpSection: styled.div`
    ${tw``}
  `,
  SignUpForm: styled.form`
    ${tw`mt-8`}
  `,
  Header: styled.h1`
    ${tw`font-extrabold text-2xl text-center pb-2 font-cafe24`}
  `,
  Label: styled.label`
    ${tw`font-extrabold text-xl text-center p-2`}
  `,
  Input: styled.input`
    ${tw`block w-full bg-transparent outline-none border-2 rounded-md py-2 px-4 mt-2 mb-2 placeholder-slate-400 focus:border-brand`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-sm font-bold`}
  `,
  InputBox: styled.div`
    ${tw`flex`}
  `,
  RegisteredButton: styled.button`
    ${tw`ml-3 text-lg bg-brand text-white hover:bg-brandHover m-1 rounded min-w-[100px]`}
  `,
  SignUpButton: styled.button`
    ${tw`bg-brand w-full mt-10 py-2 px-4 rounded-md text-xl font-cafe24 text-white hover:bg-brandHover`}
  `,
};
