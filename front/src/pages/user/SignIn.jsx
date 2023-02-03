import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import SignInFooter from '../../components/user/signin/SignInFooter';
import SignInForm from '../../components/user/signin/SignInForm';

export default function SignIn() {
  return (
    <S.SignInSection>
      <S.SignInBox>
        <S.SignInHeader>로그인</S.SignInHeader>
        <SignInForm />
        <SignInFooter />
      </S.SignInBox>
      <S.Test>테스트</S.Test>
    </S.SignInSection>
  );
}

const S = {
  SignInSection: styled.div`
    ${tw`px-10 min-h-[730px] bg-brand flex justify-center items-center`}
  `,
  SignInBox: styled.div`
    ${tw`bg-white rounded-3xl w-[550px] h-[450px] p-16`}
  `,
  SignInHeader: styled.h1`
    ${tw`font-extrabold text-2xl text-center pb-2 font-cafe24`}
  `,
  Test: styled.div`
    background-color: aquamarine;
    height: 500px;
    width: 300px;
  `,
};
