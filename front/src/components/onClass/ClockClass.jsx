/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { OnClassContext } from '../../context/OnClassContext';
import ClockGame from '../program/ClockGame';
import { socket, SocketContext } from '../../context/SocketContext';
import useAuth from '../../hooks/queries/useAuth';

export default function ClockProgram() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  // 데이터 가져오기
  const { request, setRequest, response, setResponse, cnt, setCnt } =
    useContext(OnClassContext);
  const { clickPrevButton, clickNextButton, clickEndButton } =
    useContext(SocketContext);

  // 문제 넘기기 관련
  const cntPlus = () => {
    cnt < request.num - 1 && setCnt(cnt + 1);
    cnt + 1 < request.num && clickNextButton(cnt + 1); // socket
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    cnt > 0 && clickPrevButton(cnt - 1); // socket
  };
  const handleEndGame = () => {
    setRequest({
      game: '',
      difficulty: '',
      num: 0,
    });
    setResponse(['default']);
    clickEndButton({ game: '', difficulty: '', num: 0 }); // socket
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
    <S.ClockProgramSection>
      {/* <S.ClockDifficulty>{request.difficulty}</S.ClockDifficulty> */}
      <S.ClockTitle>시계 읽기</S.ClockTitle>
      <S.ClockContext>
        [Q{cnt + 1}] 다음 시계를 보고 시간을 말해보세요.
      </S.ClockContext>
      <S.Board>
        {(cnt > 0 && cnt <= request.num - 1 && (
          <MdNavigateBefore
            className={`${student ? 'hidden' : ''} btn`}
            onClick={cntMinus}
          />
        )) || (
          <MdNavigateBefore className={`${student ? 'hidden' : ''} disbtn`} />
        )}
        <ClockGame {...response[0][cnt]} />
        {(cnt < request.num - 1 && (
          <MdNavigateNext
            className={`${student ? 'hidden' : ''} btn`}
            onClick={cntPlus}
          />
        )) || (
          <MdNavigateNext className={`${student ? 'hidden' : ''} disbtn`} />
        )}
      </S.Board>
      <S.EndGame
        type="button"
        onClick={handleEndGame}
        className={`${student ? 'hidden' : ''}`}
      >
        클래스 종료
      </S.EndGame>
    </S.ClockProgramSection>
  );
}

const S = {
  ClockProgramSection: styled.div`
    ${tw`flex-col`}
  `,
  ClockDifficulty: styled.h4`
    ${tw`flex text-xl justify-end `}
  `,
  ClockTitle: styled.h1`
    ${tw` flex text-4xl min-h-[60px] justify-center items-center font-bold text-white mt-20`}
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
  Board: styled.div`
    ${tw`flex justify-around items-center`}
    .btn {
      ${tw`border-2 rounded-full text-6xl text-brand hover:cursor-pointer bg-white`}
    }
    .disbtn {
      ${tw`cursor-not-allowed border-2 rounded-full text-6xl invisible`}
    }
  `,
  EndGame: styled.button`
    ${tw`bg-white absolute bottom-[7vh] right-[6vh] p-3 rounded font-bold text-xl`}
  `,
};
