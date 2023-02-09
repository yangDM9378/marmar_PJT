/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function Infoheader() {
  return (
    <S.InfoHeader>
      <S.InfoImgAndText>
          <S.Img className="bg-info-header bg-cover opacity-80" />
        <S.InfoText>
          <p>마르마르는 시간, 장소 제약없이</p>
          <p>실무자와 소통을 통해 엄선된 컨텐츠 자료를 통한</p>
          <p>온/오프라인 병행 언어치료 플랫폼 입니다.</p>
        </S.InfoText>
      </S.InfoImgAndText>
    </S.InfoHeader>
  );
}

const S = {
  InfoHeader: styled.div`
    ${tw`mt-[8vh]`}
  `,
  InfoImgAndText: styled.div`
    ${tw`relative bg-black`}
  `,
  Img: styled.div`
    ${tw`h-[92vh]`}
  `,
  InfoText: styled.div`
    ${tw`absolute top-[68vh] right-[10vh] text-[4vh] text-right text-white font-bold`}
  `
};
