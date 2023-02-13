/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useModify from '../../../hooks/queries/useModify';

const schema = yup
  .object({
    nowPasswordHelper: yup
      .string()
      .required('현재 사용중인 2차 비밀번호를 입력해주세요.'),
    passwordHelper: yup
      .string()
      .required('변경할 2차 비밀번호를 입력해주세요.'),
  })
  .required();
export default function ChangePasswordHelper() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { useModPasswordHelper } = useModify();
  const onChangePasswordHelper = data => {
    useModPasswordHelper.mutate({
      nowPasswordHelper: data.nowPasswordHelper,
      modifyPasswordHelper: data.passwordHelper,
    });
    alert('2차 비밀번호가 변경되었습니다.');
  };
  return (
    <S.Form onSubmit={handleSubmit(onChangePasswordHelper)}>
      <div>
        <S.Label htmlFor="nowPasswordHelper">현재 2차 비밀번호</S.Label>
        <S.InputBox>
          <S.Input
            {...register('nowPasswordHelper')}
            id="nowPasswordHelper"
            type="password"
            maxLength="4"
            placeholder="현재 2차 비밀번호를 입력해 주세요"
          />
          <S.Button type="button" className="invisible">
            css용
          </S.Button>
        </S.InputBox>
        <S.ErrorMsg>{errors.nowPasswordHelper?.message}</S.ErrorMsg>
      </div>
      <div>
        <S.Label htmlFor="passwordHelper">새 2차 비밀번호</S.Label>
        <S.InputBox>
          <S.Input
            {...register('passwordHelper')}
            type="password"
            id="passwordHelper"
            maxLength="4"
            placeholder="변경할 2차 비밀번호를 입력해 주세요"
          />
          <S.Button type="submit">2차 비밀번호 변경</S.Button>
        </S.InputBox>
      </div>
    </S.Form>
  );
}

const S = {
  Form: styled.form`
    ${tw` pb-3`}
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
    ${tw` bg-brandHover text-white min-w-[200px] rounded-xl block`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
};
