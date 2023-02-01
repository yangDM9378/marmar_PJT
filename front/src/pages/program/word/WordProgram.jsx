/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useLocation, useNavigate } from 'react-router-dom';
import { getWordApi } from '../../../api/programApi';
import WordGame from '../../../components/program/WordGame';
import ReactSpeechRecognition from '../../../components/program/ReactSpeechRecognition';
import TextToSpeech from '../../../components/program/TextToSpeech';

export default function WordProgram() {
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [wordData, setWordData] = useState([]);
  const [cnt, setCnt] = useState(0);

  const getWordData = async () => {
    console.log(difficulty);
    const response = await getWordApi(difficulty);
    console.log(response.data);
    setWordData(response.data);
  };

  useEffect(() => {
    getWordData();
  }, [difficulty]);

  const navigate = useNavigate();
  const cntPlus = () => {
    cnt < 10 && setCnt(cnt + 1);
    cnt >= 10 && navigate('/WordFinish');
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
  };
  const handleStop = transcript => {
    if (transcript === wordData[cnt].wordSpeakingQuestion) {
      console.log('정답이라누');
    }
  };

  return (
    <S.WordProgramSection>
      <S.WordDifficulty>{difficulty}</S.WordDifficulty>
      <S.WordTitle>단어 읽기</S.WordTitle>
      <S.WordContext>다음 단어와 그림을 보고 말소리를 녹음해라</S.WordContext>
      <S.WordBtnAndGame>
        {(cnt > 0 && (
          <button type="button" onClick={cntMinus}>
            이전
          </button>
        )) || <S.ButtonDisable type="button">이전</S.ButtonDisable>}

        <WordGame {...wordData[cnt]} />
        <button type="button" onClick={cntPlus}>
          다음
        </button>
      </S.WordBtnAndGame>
      <ReactSpeechRecognition onStop={handleStop} />
      <TextToSpeech />
    </S.WordProgramSection>
  );
}

const S = {
  WordProgramSection: styled.div`
    ${tw` bg-brand min-h-[800px] flex-col`}
  `,
  WordDifficulty: styled.h4`
    ${tw`flex text-xl justify-end `}
  `,
  WordTitle: styled.h1`
    ${tw` flex text-4xl min-h-[60px] justify-center items-center font-bold text-white`}
  `,
  WordContext: styled.p`
    ${tw` flex text-xl min-h-[100px] justify-center font-thin text-white`}
  `,
  WordBtnAndGame: styled.div`
    ${tw`flex justify-around`}
  `,
  ButtonDisable: styled.button`
    ${tw`cursor-not-allowed`}
  `,
};
