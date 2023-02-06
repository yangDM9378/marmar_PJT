/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import useDelete from '../../../hooks/queries/useDelete';

export default function ChangePassword(prop) {
  const status = prop;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const { useDeleteAccount } = useDelete();
  const onChangePassword = async data => {
    useDeleteAccount.mutate({ password: data.password, status });
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
      <S.Button type="submit">계정 삭제</S.Button>
    </S.Form>
  );
}

const S = {
  Form: styled.form`
    ${tw`border-b-2 pb-3 space-y-5`}
  `,
  Label: styled.label`
    ${tw`flex font-cafe24`}
  `,
  InputBox: styled.div`
    ${tw`flex`}
  `,
  Input: styled.input`
    ${tw`p-3 border-2 rounded-xl mr-3 w-full min-w-[160px]  focus:outline-brand`}
  `,
  Button: styled.button`
    ${tw`p-3 bg-brandHover text-white min-w-[160px] rounded-xl block`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
};
