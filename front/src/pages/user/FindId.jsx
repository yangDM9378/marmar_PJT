import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import FindIdFooter from '../../components/user/findid/FindIdFooter';
import FindIdForm from '../../components/user/findid/FindIdForm';

export default function FindId() {
  return (
    <S.FindSection>
      <S.FindBox>
        <S.FindHeader>아이디 찾기</S.FindHeader>
        <FindIdForm />
        <FindIdFooter />
      </S.FindBox>
    </S.FindSection>
  );
}
// ${tw`px-10 bg-brand min-h-[730px] flex justify-center items-center`}
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
