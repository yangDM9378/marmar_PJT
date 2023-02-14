/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeHeader() {
  return (
    <S.Header>
      <S.MainImgAndText>
        <S.Img className="bg-main-bg-1 bg-cover opacity-90" />
        <S.MainText>
          <p>마르마르는 시간, 장소 제약없이</p>
          <p>실무자와 소통을 통해 엄선된 컨텐츠 자료를 제공하는</p>
          <p>온/오프라인 병행 언어치료 플랫폼 입니다.</p>
        </S.MainText>
      </S.MainImgAndText>
    </S.Header>
  );
}

const S = {
  Header: styled.div`
    ${tw`mt-[8vh] w-full`}
  `,
  MainImgAndText: styled.div`
    ${tw`relative bg-black`}
  `,
  Img: styled.div`
    ${tw`h-[92vh]`}
  `,
  MainText: styled.div`
    ${tw`absolute top-[68vh] right-[10vh] text-[4vh] text-right text-white font-bold`}
  `,
};
