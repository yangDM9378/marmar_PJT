/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
// import { useForm } from 'react-hook-form';
import useDelete from '../../../hooks/queries/useDelete';

export default function DeletePassword(prop) {
  const { status } = prop;
  const [pw, setPw] = useState('');
  const { useDeleteAccount } = useDelete();
  const handleChange = e => {
    setPw(e.target.value);
  };
  const handleDelete = async e => {
    e.preventDefault();
    useDeleteAccount.mutate({ password: pw, status });
  };

  return (
    <S.Form onSubmit={handleDelete}>
      <S.Label htmlFor="password">비밀번호</S.Label>
      <S.InputBox className="border-b-white">
        <S.Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          onChange={handleChange}
        />
      </S.InputBox>
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
