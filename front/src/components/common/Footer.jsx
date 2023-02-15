import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function Footer() {
  return (
    <S.Section>
      <S.TextBox>
        <S.TextHeader>마르마르 이용약관</S.TextHeader>
        <S.TextBody>
          <span>마르마르 주식회사 대표 : 이서정</span>
          <span>개인정보보호책임자 : 윤명지</span>
          <span>IT 기획사 : 문여경</span>
        </S.TextBody>
        <p className="my-1 text-sm">
          주소 : 광주광역시 하남산단6번로 100 G5 주차장
        </p>
        <p className="mt-3 text-sm">대표번호 : 010-1234-5678</p>
      </S.TextBox>
      <S.ImgBox>
        <img src="logo.png" alt="logo.png" />
      </S.ImgBox>
    </S.Section>
  );
}

const S = {
  Section: styled.div`
    ${tw`bg-gray-200 h-[180px] flex justify-between px-5 py-5`}
  `,
  TextBox: styled.div`
    ${tw`justify-center flex flex-col`}
  `,
  TextHeader: styled.div`
    ${tw`text-lg font-bold mb-3`}
  `,
  TextBody: styled.div`
    ${tw`text-sm space-x-5 `}
  `,
  ImgBox: styled.div`
    ${tw`flex justify-center align-middle items-center`}
  `,
};
