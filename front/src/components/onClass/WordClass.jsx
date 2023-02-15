/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { OnClassContext } from '../../context/OnClassContext';
// import WordGame from '../program/WordGame';
import { socket, SocketContext } from '../../context/SocketContext';
import useAuth from '../../hooks/queries/useAuth';
import ClassWordGame from './game/ClassWordGame';

export default function WordClass() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  // 데이터 가져오기
  const { request, setRequest, response, setResponse, cnt, setCnt } =
    useContext(OnClassContext);
  const { clickPrevButton, clickNextButton, clickEndButton } =
    useContext(SocketContext);

  // 문제 넘기기 관련

  const cntPlus = () => {
    cnt + 1 < request.num && setCnt(cnt + 1);
    cnt + 1 < request.num && clickNextButton(cnt + 1); // socket_emit
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    cnt > 0 && clickPrevButton(cnt - 1); // socket_emit
  };
  const handleEndGame = () => {
    setRequest({
      game: '',
      difficulty: '',
      num: 0,
    });
    setResponse(['default']);
    clickEndButton({ game: '', difficulty: '', num: 0 }); // socket_emit
  };

  // socket 다음 버튼
  socket.on('nextButton', num => {
    setCnt(num);
  });
  // socket 이전 버튼
  socket.on('prevButton', num => {
    setCnt(num);
  });
  // socket 엔드 버튼
  socket.on('endButton', payload => {
    setRequest(payload);
    setResponse(['default']);
  });

  return (
    <S.WordProgramSection>
      {/* <S.WordDifficulty>{request.difficulty}</S.WordDifficulty> */}
      <S.WordTitle>바르게 말하기</S.WordTitle>
      <S.WordContext>다음 그림과 단어를 보고 따라 읽어보세요.</S.WordContext>
      <S.WordBtnAndGame>
        <S.WordBtn type="button" className={`${student ? 'hidden' : ''}`}>
          {(cnt > 0 && (
            <MdNavigateBefore
              className={`${student ? 'hidden' : ''} btn`}
              onClick={cntMinus}
            />
          )) || (
            <MdNavigateBefore className={`${student ? 'hidden' : ''} disbtn`} />
          )}
        </S.WordBtn>
        {/* <WordGame {...response[0][cnt]} /> */}
        <ClassWordGame {...response[0][cnt]} />
        <S.WordBtn type="button" className={`${student ? 'hidden' : ''}`}>
          {(cnt < 4 && (
            <MdNavigateNext
              className={`${student ? 'hidden' : ''} btn`}
              onClick={cntPlus}
            />
          )) || (
            <MdNavigateNext className={`${student ? 'hidden' : ''} disbtn`} />
          )}
        </S.WordBtn>
      </S.WordBtnAndGame>
      <S.EndGame
        type="button"
        onClick={handleEndGame}
        className={`${student ? 'hidden' : ''}`}
      >
        <img src="eraser.png" className="w-full h-full" alt="" />
      </S.EndGame>
    </S.WordProgramSection>
  );
}

const S = {
  WordProgramSection: styled.div`
    ${tw`flex-col p-5`}
  `,
  WordDifficulty: styled.h4`
    ${tw`flex text-xl justify-end `}
  `,
  WordTitle: styled.h1`
    ${tw` flex text-6xl min-h-[60px] justify-center items-center font-cafe24 text-white mt-14 mb-5`}
  `,
  WordContext: styled.p`
    ${tw` flex text-3xl min-h-[100px] justify-center font-cafe24 text-white`}
  `,
  WordBtnAndGame: styled.div`
    ${tw`flex justify-around`}
    button {
      ${tw`text-white`}
    }
  `,
  WordBtn: styled.button`
    ${tw`flex justify-center items-center`}
    .btn {
      ${tw`border-2 rounded-full text-6xl text-brand hover:cursor-pointer bg-white`}
    }
    .disbtn {
      ${tw`cursor-not-allowed border-2 rounded-full text-6xl invisible`}
    }
  `,
  ButtonDisable: styled.button`
    ${tw`cursor-not-allowed`}
  `,
  EndGame: styled.button`
    ${tw`absolute bottom-[0.3vh] right-[2vh] p-3 rounded font-bold text-xl h-[200px]`}
  `,
};
