/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getClockApi } from '../../../api/programApi';
import { SttContext } from '../../../context/SttContext';
import ClockGame from '../../../components/program/ClockGame';
import ReactSpeechRecognition from '../../../components/program/ReactSpeechRecognition';

export default function ClockProgram() {
  const { cnt, cntMinus, cntPlus } = useContext(SttContext);
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [clockData, setClockData] = useState([]);

  // 데이터 가져오기
  useEffect(() => {
    getClockData();
  }, [difficulty]);

  const getClockData = async () => {
    const response = await getClockApi(difficulty);
    setClockData(response.data);
  };

  return (
    <S.ClockProgramSection>
      <S.ClockDifficulty>{difficulty}</S.ClockDifficulty>
      <S.ClockTitle>단어 읽기</S.ClockTitle>
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

      <ClockGame {...clockData[cnt]} />
      <ReactSpeechRecognition />
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
