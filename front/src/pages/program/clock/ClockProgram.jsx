/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useLocation, useNavigate } from 'react-router-dom';
import { getClockApi } from '../../../api/programApi';
import ClockGame from '../../../components/program/ClockGame';
import ReactSpeechRecognition from '../../../components/program/ReactSpeechRecognition';

export default function ClockProgram() {
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [clockData, setClockData] = useState([]);
  const [cnt, setCnt] = useState(0);

  const getClockData = async () => {
    console.log(difficulty);
    const response = await getClockApi(difficulty);
    console.log(response.data);
    setClockData(response.data);
  };

  useEffect(() => {
    getClockData();
  }, [difficulty]);

  const navigate = useNavigate();
  const cntPlus = () => {
    cnt < 10 && setCnt(cnt + 1);
    cnt >= 10 && navigate('/ClockFinish');
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
  };
  const handleStop = transcript => {
    if (transcript === clockData[cnt].ClockSpeakingQuestion) {
      console.log('정답이라누');
    }
  };

  return (
    <S.ClockProgramSection>
      <S.ClockDifficulty>{difficulty}</S.ClockDifficulty>
      <S.ClockTitle>단어 읽기</S.ClockTitle>
      <S.ClockContext>다음 단어와 그림을 보고 말소리를 녹음해라</S.ClockContext>
      <S.ClockBtnAndGame>
        {(cnt > 0 && (
          <button type="button" onClick={cntMinus}>
            이전
          </button>
        )) || <S.ButtonDisable type="button">이전</S.ButtonDisable>}

        <ClockGame {...clockData[cnt]} />
        <button type="button" onClick={cntPlus}>
          다음
        </button>
      </S.ClockBtnAndGame>
      <ReactSpeechRecognition onStop={handleStop} />
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
