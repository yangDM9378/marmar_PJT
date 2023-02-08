import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import SignUpStudentForm from '../../components/user/signup/SignUpStudentForm';

export default function SignUpStudent() {
  return (
    <S.SignUpSection>
      <S.SignUpBox>
        <SignUpStudentForm />
      </S.SignUpBox>
    </S.SignUpSection>
  );
}
const S = {
  SignUpSection: styled.div`
    ${tw`bg-brand p-[15vh] flex justify-center `}
  `,
  SignUpBox: styled.div`
    ${tw`bg-white rounded-3xl min-w-[70vh] p-10`}
  `,
};
