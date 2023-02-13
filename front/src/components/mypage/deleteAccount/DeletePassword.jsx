/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState } from 'react';
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
    <S.Container>
      <p className="font-cafe24 text-[40px] pb-10">탈퇴하기</p>
      <S.body>
        <S.Form onSubmit={handleDelete}>
          <S.Label htmlFor="password">비밀번호 확인</S.Label>
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
      </S.body>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`h-fit w-full pb-20 pt-5  m-5 justify-center text-center`}
  `,
  body: styled.div`
    ${tw`text-[20px] pl-10 pr-10`}
  `,
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
    ${tw`p-3 bg-brandHover text-white min-w-[160px] rounded-xl mt-10`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
};
