/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { getWordApi } from '../../../api/programApi';
import { SttContext } from '../../../context/SttContext';
import WordGame from '../../../components/program/WordGame';
import ReactSpeechRecognition from '../../../components/program/ReactSpeechRecognition';
import TextToSpeech from '../../../components/program/TextToSpeech';

export default function WordProgram() {
  const { stopForNext } = useContext(SttContext);
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [Data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [difficulty]);

  const getData = async () => {
    const response = await getWordApi(difficulty);
    console.log(response);
    setData(response.data);
  };

  // 문제 넘기기 관련
  const navigate = useNavigate();
  const [cnt, setCnt] = useState(0);
  const cntPlus = game => {
    cnt < 9 && setCnt(cnt + 1);
    cnt >= 9 && navigate(`WordFinish`);
    stopForNext();
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    stopForNext();
  };

  return (
    <S.WordProgramSection>
      <S.WordDifficulty>{difficulty}</S.WordDifficulty>
      <S.WordTitle>단어 읽기</S.WordTitle>
      <S.WordContext>
        [Q{cnt + 1}] 다음 그림과 단어를 보고 따라 읽어보세요.
      </S.WordContext>
      <S.WordBody>
        <S.WordBtnAndGame>
          <S.WordBtn>
            {(cnt > 0 && (
              <MdNavigateBefore className="btn" onClick={cntMinus} />
            )) || <MdNavigateBefore className="disbtn" />}
          </S.WordBtn>
          <WordGame {...Data[cnt]} />
          <S.WordBtn>
            <MdNavigateNext className="btn" onClick={cntPlus} />
          </S.WordBtn>
        </S.WordBtnAndGame>

        <S.STTAndTTS>
          <ReactSpeechRecognition {...Data[cnt]} />
          <TextToSpeech {...Data[cnt]} />
        </S.STTAndTTS>
      </S.WordBody>
    </S.WordProgramSection>
  );
}

const S = {
  WordProgramSection: styled.div`
    ${tw`bg-brand min-h-[580px] flex-col`}
  `,

  WordDifficulty: styled.h4`
    ${tw`flex text-xl justify-end text-white`}
  `,
  WordTitle: styled.h1`
    ${tw` flex text-4xl min-h-[60] justify-center items-center font-bold text-white`}
  `,
  WordContext: styled.p`
    ${tw` flex text-xl min-h-[100] justify-center font-thin text-white`}
  `,
  WordBody: styled.div`
    ${tw`bg-white`}
  `,
  WordBtnAndGame: styled.div`
    ${tw`flex justify-around`}
  `,
  WordBtn: styled.div`
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
