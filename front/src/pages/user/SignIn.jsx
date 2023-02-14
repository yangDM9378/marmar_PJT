import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import SignInFooter from '../../components/user/signin/SignInFooter';
import SignInForm from '../../components/user/signin/SignInForm';

export default function SignIn() {
  return (
    <S.SignInSection className="bg-suabg-1 bg-contain">
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
    ${tw`px-10 h-[650px] flex justify-center items-center min-h-screen`}
  `,
  SignInBox: styled.div`
    ${tw`bg-white rounded-3xl w-[550px] h-[450px] p-16`}
  `,
  SignInHeader: styled.h1`
    ${tw`font-extrabold text-3xl text-center pb-2 font-cafe24`}
  `,
};
