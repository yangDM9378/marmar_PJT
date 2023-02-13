/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { BsFillReplyAllFill } from 'react-icons/bs';
import { getClockApi } from '../../../api/programApi';
import { SttContext } from '../../../context/SttContext';
import ClockGame from '../../../components/program/ClockGame';
import ReactSpeechRecognition from '../../../components/program/ReactSpeechRecognition';
import TextToSpeech from '../../../components/program/TextToSpeech';
import CorrectModal from '../../../components/program/CorrectModal';
import WrongModal from '../../../components/program/WrongModal';

export default function ClockProgram() {
  const {
    stopForNext,
    modalCorrect,
    setModalCorrect,
    modalWrong,
    setModalWrong,
  } = useContext(SttContext);
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
    cnt < 4 && setCnt(cnt + 1);
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
      <CorrectModal
        isOpen={modalCorrect}
        close={() => {
          setModalCorrect(false);
        }}
      />
      <WrongModal
        isOpen={modalWrong}
        close={() => {
          setModalWrong(false);
        }}
      />

      <S.ClockDifficulty>
        <button type="button" onClick={goClockDifficulty}>
          <BsFillReplyAllFill />
        </button>
      </S.ClockDifficulty>

      <S.ClockTitle>시계읽기</S.ClockTitle>
      <S.ClockContext>
        [Q{cnt + 1}] 다음 시계를 보고 시계를 따라 읽어보세요.
      </S.ClockContext>
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
    ${tw` bg-brand mt-[80px]`}
  `,
  ClockDifficulty: styled.div`
    ${tw`flex text-[60px] justify-end items-center m-6 p-3 text-white`}
  `,
  ClockTitle: styled.div`
    ${tw` flex text-[50px] h-[80px] mb-5 justify-center items-center font-bold text-white`}
  `,
  ClockContext: styled.div`
    ${tw` flex text-2xl mb-10 h-[500] justify-center font-thin text-white`}
  `,
  ClockBody: styled.div`
    ${tw`flex flex-col justify-center items-stretch p-[90px] bg-white`}
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
      ${tw`cursor-not-allowed border-2 rounded-full text-6xl`}
    }
  `,
  STTAndTTS: styled.div`
    ${tw`flex justify-center`}
  `,
};
