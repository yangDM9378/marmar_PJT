import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function InfoBody() {
  return (
    <S.Body>
      <S.InfoMainText>
        <p>
          <q>최상의 언어치료를 제공을 위한 마르마르</q>
        </p>
      </S.InfoMainText>
      <S.InfoText>
        <S.InfoTextFlex>
          <S.InfoTextTitle>온/오프라인 병행 수업</S.InfoTextTitle>
          <S.InfoTextContext>
            시간, 장소 제약 없이 활용가능한 온라인 수업으로 치료 효과를 극대화할
            수 있습니다.
          </S.InfoTextContext>
        </S.InfoTextFlex>
      </S.InfoText>
      <S.InfoText>
        <S.InfoTextFlex>
          <S.InfoTextTitle>엄선된 교육자료</S.InfoTextTitle>
          <S.InfoTextContext>
            실무자와의 면담을 통한 온라인 교육시 좋은 효과를 볼 수 있는
            교육컨텐츠 자료 제공
          </S.InfoTextContext>
        </S.InfoTextFlex>
      </S.InfoText>
      <S.InfoText>
        <S.InfoTextFlex>
          <S.InfoTextTitle>화상미팅을 이용한 치료 수업</S.InfoTextTitle>
          <S.InfoTextContext>
            자체 프로그램을 통한 화상 미팅을 진행하여 대면 대면 치료의 어려움을
            극복하고 비대면치료 진행
          </S.InfoTextContext>
        </S.InfoTextFlex>
      </S.InfoText>
      <S.InfoText>
        <S.InfoTextFlex>
          <S.InfoTextTitle>다양한 언어훈련 컨텐츠</S.InfoTextTitle>
          <S.InfoTextContext>
            다양한 언어치료 컨텐츠를 게임을 통해 학습자의 흥미를 유도하는 다양한
            컨텐츠 제공
          </S.InfoTextContext>
        </S.InfoTextFlex>
      </S.InfoText>
    </S.Body>
  );
}

const S = {
  Body: styled.div`
    ${tw`flex-col`}
  `,
  InfoMainText: styled.div`
    ${tw`flex justify-center items-center h-[36vh] py-[6vh] text-[6vh] text-center bg-blue-300`}
  `,
  InfoText: styled.div`
    ${tw`flex justify-center items-center mx-[3vh] h-[36vh]`}
  `,
  InfoTextFlex: styled.div`
    ${tw`flex border-b-2`}
  `,
  InfoTextTitle: styled.p`
    ${tw`pl-[2vw] flex items-center w-[42vw] h-[36vh] text-[4vh] font-bold`}
  `,
  InfoTextContext: styled.p`
    ${tw`pr-[2vw] flex items-center w-[40vw] h-[36vh] text-[3vh] font-semibold`}
  `,
};
