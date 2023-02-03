/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import { getWordApi } from '../../api/programApi';
import { SttContext } from '../../context/SttContext';
import WordGame from '../../components/program/WordGame';
import ReactSpeechRecognition from '../../components/program/ReactSpeechRecognition';
import TextToSpeech from '../../components/program/TextToSpeech';

const socket = io.connect('http://localhost:4000');
export default function WordProgramTest(props) {
  const { sessionId } = props;

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
  // let cntcnt = cnt + 1;
  const cntPlus = game => {
    cnt < 9 && setCnt(cnt + 1);
    cnt >= 9 && navigate(`WordFinish`);
    console.log(`durl${cnt}`);
    stopForNext();
    socket.emit('joinRoom', { roomName: sessionId });
    socket.emit('nextclick', { cnt });
    console.log(cnt);
    socket.on('nextclick_2', data => {
      console.log(data);
    });
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    console.log(`durl${cnt}`);
    stopForNext();
    socket.emit('joinRoom', { roomName: sessionId });
    socket.emit('preclicke', { cnt });
    console.log(cnt);
    socket.on('preclicke_2', data => {
      console.log(data);
    });
  };

  return (
    <S.WordProgramSection>
      <S.WordDifficulty>{difficulty}</S.WordDifficulty>
      <S.WordTitle>단어 읽기</S.WordTitle>
      <S.WordContext>
        [Q{cnt}] 다음 단어와 그림을 보고 시간을 말해보세요.
      </S.WordContext>
      <S.WordBtnAndGame>
        {(cnt > 0 && (
          <button type="button" onClick={cntMinus}>
            이전
          </button>
        )) || <S.ButtonDisable type="button">이전</S.ButtonDisable>}
        <button type="button" onClick={cntPlus}>
          다음
        </button>
      </S.WordBtnAndGame>

      <WordGame {...Data[cnt]} />
      <ReactSpeechRecognition {...Data[cnt]} />
      <TextToSpeech {...Data[cnt]} />
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
