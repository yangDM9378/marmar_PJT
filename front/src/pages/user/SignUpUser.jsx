import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import SignUpUserForm from '../../components/user/signup/SignUpUserForm';

export default function SignUpUser() {
  return (
    <S.SignUpSection>
      <S.SignUpBox>
        <SignUpUserForm />
      </S.SignUpBox>
    </S.SignUpSection>
  );
}
const S = {
  SignUpSection: styled.div`
    ${tw`px-10 bg-brand min-h-[1500px] flex justify-center items-center`}
  `,
  SignUpBox: styled.div`
    ${tw`bg-white rounded-3xl w-[650px] h-[1300px] p-10`}
  `,
};
