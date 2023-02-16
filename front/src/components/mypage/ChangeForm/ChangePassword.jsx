/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useModify from '../../../hooks/queries/useModify';

// 최소 8자, 최대 20자 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
const pwRegExp =
  /^^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

const schema = yup
  .object({
    nowPassword: yup
      .string()
      .required('현재 사용중인 비밀번호를 입력해주세요.'),
    password: yup
      .string()
      .matches(pwRegExp, '영문/숫자/특수문자 3가지 조합 (8~20자)')
      .required('새 비밀번호를 입력해주세요.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('확인을 위해 새 비밀번호를 다시 입력해주세요.'),
  })
  .required();

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { useModPassword } = useModify();
  const onChangePassword = async data => {
    useModPassword.mutate({
      nowPassword: data.nowPassword,
      modifyPassword: data.password,
    });
    alert('비밀번호가 변경되었습니다.');
  };

  return (
    <S.Form onSubmit={handleSubmit(onChangePassword)}>
      <div>
        <S.Label htmlFor="nowPassword">현재 비밀번호</S.Label>
        <S.InputBox className="border-b-white">
          <S.Input
            {...register('nowPassword')}
            type="password"
            id="nowPassword"
            placeholder="현재 비밀번호를 입력해 주세요"
          />
          <S.Button type="button" className="invisible">
            css용
          </S.Button>
        </S.InputBox>
        <S.ErrorMsg>{errors.nowPassword?.message}</S.ErrorMsg>
      </div>
      <div>
        <S.Label htmlFor="password">새 비밀번호</S.Label>
        <S.InputBox className="border-b-white">
          <S.Input
            {...register('password')}
            type="password"
            id="password"
            placeholder="변경할 비밀번호를 입력해 주세요"
          />
          <S.Button type="button" className="invisible">
            css용
          </S.Button>
        </S.InputBox>
        <S.ErrorMsg>{errors.password?.message}</S.ErrorMsg>
      </div>
      <div>
        <S.Label htmlFor="confirmPassword">비밀번호 확인</S.Label>
        <S.InputBox>
          <S.Input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            placeholder="변경할 비밀번호를 확인해 주세요"
          />
          <S.Button type="submit">비밀번호 변경</S.Button>
        </S.InputBox>
        <S.ErrorMsg>{errors.confirmPassword?.message}</S.ErrorMsg>
      </div>
    </S.Form>
  );
}

const S = {
  Form: styled.form`
    ${tw`border-b-2 pb-3`}
  `,
  Label: styled.label`
    ${tw`flex pb-2 font-bold`}
  `,
  InputBox: styled.div`
    ${tw`flex`}
  `,
  Input: styled.input`
    ${tw`p-3 border-2 rounded-xl mr-3 w-full min-w-[160px]  focus:outline-brand`}
  `,
  Button: styled.button`
    ${tw`p-3 bg-brandHover text-white min-w-[200px] rounded-xl block`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold text-left`}
  `,
};
