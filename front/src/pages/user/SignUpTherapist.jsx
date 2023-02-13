import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import SignUpTherapistForm from '../../components/user/signup/SignUpTherapistForm';

export default function SignUpTherapist() {
  return (
    <S.SignUpSection className="bg-suabg-2 bg-contain">
      <S.SignUpBox>
        <SignUpTherapistForm />
      </S.SignUpBox>
    </S.SignUpSection>
  );
}

const S = {
  SignUpSection: styled.div`
    ${tw`flex bg-brand pt-[15vh] pb-[10vh] mt-[40px] justify-center`}}
  `,
  SignUpBox: styled.div`
    ${tw`bg-white rounded-3xl min-w-[70vh] p-10`}
  `,
};
