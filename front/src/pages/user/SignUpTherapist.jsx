import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import SignUpTherapistForm from '../../components/user/signup/SignUpTherapistForm';

export default function SignUpTherapist() {
  return (
    <S.SignUpSection>
      <S.SignUpBox>
        <SignUpTherapistForm />
      </S.SignUpBox>
    </S.SignUpSection>
  );
}
const S = {
  SignUpSection: styled.div`
    ${tw`px-10 bg-brand min-h-[1100px] flex justify-center items-center`}
  `,
  SignUpBox: styled.div`
    ${tw`bg-white rounded-3xl w-[650px] h-[1000px] p-10`}
  `,
};
