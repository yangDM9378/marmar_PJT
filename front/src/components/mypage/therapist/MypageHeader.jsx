/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useAuth from '../../../hooks/queries/useAuth';

export default function MypageHeader() {
  const { useTherapistCheck } = useAuth();
  const { data: therapist } = useTherapistCheck();

  return (
    <S.MypageHeader>
      <S.HeaderInfo>내 정보</S.HeaderInfo>
      <S.HeaderLogoBox>
        <img src="logo.png" className="w-20 h-20 pt-1" />
      </S.HeaderLogoBox>
      <S.HeaderName>{therapist.therapistName}</S.HeaderName>
    </S.MypageHeader>
  );
}

const S = {
  MypageHeader: styled.div`
    ${tw`h-[300px] bg-brand flex flex-col justify-center items-center space-y-3`}
  `,
  HeaderInfo: styled.h1`
    ${tw`text-3xl text-white font-cafe24`}
  `,
  HeaderLogoBox: styled.div`
    ${tw`bg-white rounded-full w-28 h-28 flex justify-center items-center`}
  `,
  HeaderName: styled.h4`
    ${tw`text-xl text-white font-cafe24`}
  `,
};
