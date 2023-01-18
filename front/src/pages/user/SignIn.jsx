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
    </S.SignInSection>
  );
}

const S = {
  SignInSection: styled.div`
    ${tw`px-10 bg-brand min-h-[800px] flex justify-center items-center`}
  `,
  SignInBox: styled.div`
    ${tw`bg-white rounded-3xl w-[550px] h-[550px] p-16`}
  `,
  SignInHeader: styled.h1`
    ${tw`font-extrabold text-2xl text-center pb-2 font-cafe24`}
  `,
};
