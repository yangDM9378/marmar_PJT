import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';

export default function SignInFooter() {
  const navigate = useNavigate();
  const onGoSignUp = () => {
    navigate('/SignUp');
  };
  return (
    <S.FooterBox>
      <span>아직 회원이 아니신가요?</span>
      <S.SignUpBtn onClick={onGoSignUp}>회원가입</S.SignUpBtn>
    </S.FooterBox>
  );
}

const S = {
  FooterBox: styled.div`
    ${tw`border-t-2 w-full text-xs text-center py-4 space-x-2 text-slate-400`}
  `,
  SignUpBtn: styled.button`
    ${tw`text-xs text-brand font-bold`}
  `,
};
