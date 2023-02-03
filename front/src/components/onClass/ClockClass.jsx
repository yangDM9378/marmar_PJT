/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useContext } from 'react';
import { OnClassContext } from '../../context/OnClassContext';
import ClockGame from '../program/ClockGame';

export default function ClockProgram() {
  // 데이터 가져오기
  const { request, response } = useContext(OnClassContext);

  // 문제 넘기기 관련
  const [cnt, setCnt] = useState(0);
  const cntPlus = game => {
    cnt < 9 && setCnt(cnt + 1);
    // cnt >= request.count && alart('end');
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
  };

  return (
    <S.ClockProgramSection>
      <S.ClockDifficulty>{request.difficulty}</S.ClockDifficulty>
      <S.ClockTitle>{request.program}</S.ClockTitle>
      <S.ClockContext>
        [Q{cnt + 1}] 다음 시계를 보고 시간을 말해보세요.
      </S.ClockContext>
      <S.ClockBtnAndGame>
        {(cnt > 0 && (
          <button type="button" onClick={cntMinus}>
            이전
          </button>
        )) || <S.ButtonDisable type="button">이전</S.ButtonDisable>}
        <button type="button" onClick={cntPlus}>
          다음
        </button>
      </S.ClockBtnAndGame>
      <ClockGame {...response[cnt]} />
    </S.ClockProgramSection>
  );
}

const S = {
  ClockProgramSection: styled.div`
    ${tw` bg-brand min-h-[800px] flex-col`}
  `,
  ClockDifficulty: styled.h4`
    ${tw`flex text-xl justify-end `}
  `,
  ClockTitle: styled.h1`
    ${tw` flex text-4xl min-h-[60px] justify-center items-center font-bold text-white`}
  `,
  ClockContext: styled.p`
    ${tw` flex text-xl min-h-[100px] justify-center font-thin text-white`}
  `,
  ClockBtnAndGame: styled.div`
    ${tw`flex justify-around`}
  `,
  ButtonDisable: styled.button`
    ${tw`cursor-not-allowed`}
  `,
};
