/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { getClockApi } from '../../../api/programApi';
import { SttContext } from '../../../context/SttContext';
import ClockGame from '../../../components/program/ClockGame';
import ReactSpeechRecognition from '../../../components/program/ReactSpeechRecognition';
import TextToSpeech from '../../../components/program/TextToSpeech';

export default function ClockProgram() {
  const { stopForNext } = useContext(SttContext);
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [Data, setData] = useState([[]]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [difficulty]);

  const getData = async () => {
    const response = await getClockApi(difficulty);
    console.log(response);
    setData(response.data);
  };

  // 문제 넘기기 관련
  const [cnt, setCnt] = useState(0);
  const cntPlus = () => {
    cnt < 9 && setCnt(cnt + 1);
    stopForNext();
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    stopForNext();
  };

  const goClockDifficulty = () => {
    navigate(`/ClockDifficulty`);
  };

  return (
    <S.ClockProgramSection>
      <S.ClockDifficulty>
        {difficulty}
        <button type="button" onClick={goClockDifficulty}>
          처음으로
        </button>
      </S.ClockDifficulty>

      <S.ClockTitle>시계읽기</S.ClockTitle>
      <S.ClockContext>[Q{cnt + 1}] 다음 시간을 맞춰보세요^^</S.ClockContext>
      <S.ClockBody>
        <S.ClockBtnAndGame>
          <S.ClockBtn>
            {(cnt > 0 && (
              <MdNavigateBefore className="btn" onClick={cntMinus} />
            )) || <MdNavigateBefore className="disbtn" />}
          </S.ClockBtn>
          <ClockGame {...Data[0][cnt]} />
          <S.ClockBtn>
            {(cnt < 4 && (
              <MdNavigateNext className="btn" onClick={cntPlus} />
            )) || <MdNavigateNext className="disbtn" />}
          </S.ClockBtn>
        </S.ClockBtnAndGame>

        <S.STTAndTTS>
          <ReactSpeechRecognition {...Data[0][cnt]} />
          <TextToSpeech {...Data[0][cnt]} />
        </S.STTAndTTS>
      </S.ClockBody>
    </S.ClockProgramSection>
  );
}

const S = {
  ClockProgramSection: styled.div`
    ${tw`bg-brand min-h-[580px] max-h-[600px] flex-col`}
  `,

  ClockDifficulty: styled.h4`
    ${tw`flex text-xl justify-end text-white`}
  `,
  ClockTitle: styled.h1`
    ${tw` flex text-4xl min-h-[60] justify-center items-center font-bold text-white`}
  `,
  ClockContext: styled.p`
    ${tw` flex text-xl min-h-[100] justify-center font-thin text-white`}
  `,
  ClockBody: styled.div`
    ${tw`bg-white`}
  `,
  ClockBtnAndGame: styled.div`
    ${tw`flex justify-around`}
  `,
  ClockBtn: styled.div`
    ${tw`flex justify-center items-center`}
    .btn {
      ${tw`border-2 rounded-full text-6xl text-brand`}
    }
    .disbtn {
      ${tw`cursor-not-allowed border-2 rounded-full text-6xl text-gray-600`}
    }
  `,

  STTAndTTS: styled.div`
    ${tw`flex justify-center`}
  `,
};
