import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import FindPwFooter from '../../components/user/findpw/FindPwFooter';
import FindPwForm from '../../components/user/findpw/FindPwForm';

export default function FindPw() {
  return (
    <S.FindSection>
      <S.FindBox>
        <S.FindHeader>비밀번호 찾기</S.FindHeader>
        <FindPwForm />
        <FindPwFooter />
      </S.FindBox>
    </S.FindSection>
  );
}

const S = {
  FindSection: styled.div`
    ${tw`px-10 mt-[100px] min-h-[71vh] bg-brand flex justify-center items-center`}
  `,
  FindBox: styled.div`
    ${tw`bg-white rounded-3xl w-[550px] h-fit p-16`}
  `,
  FindHeader: styled.h1`
    ${tw`font-extrabold text-2xl text-center font-cafe24`}
  `,
};
