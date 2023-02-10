/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { OnClassContext } from '../../context/OnClassContext';
// import PictureGame from '../program/PictureGame';
import { SttContext } from '../../context/SttContext';
import { socket, SocketContext } from '../../context/SocketContext';
import useAuth from '../../hooks/queries/useAuth';
import ClassPictureGame from './game/ClassPictureGame';

export default function PictureClass() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  // 데이터 가져오기
  const { request, setRequest, response, setResponse, cnt, setCnt } =
    useContext(OnClassContext);
  const { setIsCheckArr } = useContext(SttContext);
  const { clickPrevButton, clickNextButton, clickEndButton } =
    useContext(SocketContext);
  // 문제 넘기기 관련
  const cntPlus = () => {
    setIsCheckArr([false, false, false, false]);
    cnt < request.num - 1 && setCnt(cnt + 1);
    cnt < request.num - 1 && clickNextButton(cnt + 1); // socket_emit
  };
  const cntMinus = () => {
    setIsCheckArr([false, false, false, false]);
    cnt > 0 && setCnt(cnt - 1);
    cnt > 0 && clickPrevButton(cnt - 1); // socket_emit
  };
  const handleEndGame = () => {
    setRequest({
      game: '',
      difficulty: '',
      num: 0,
    });
    setIsCheckArr([false, false, false, false]);
    setResponse(['default']);
    clickEndButton({ game: '', difficulty: '', num: 0 }); // socket_emit
  };

  // socket 다음 버튼
  socket.on('nextButton', num => {
    setIsCheckArr([false, false, false, false]);
    setCnt(num);
  });
  // socket 이전 버튼
  socket.on('prevButton', num => {
    setIsCheckArr([false, false, false, false]);
    setCnt(num);
  });
  // socket 엔드 버튼
  socket.on('endButton', payload => {
    setRequest(payload);
    setIsCheckArr([false, false, false, false]);
    setResponse(['default']);
  });

  return (
    <S.ProgramSection>
      <S.Title>
        <S.Context>
          [Q{cnt + 1}] 다음 사진 중 관계없는 사진을 선택하세요.
        </S.Context>
        <div>그림 맞추기</div>
      </S.Title>

      <S.Board>
        {(cnt > 0 && cnt <= request.num - 1 && (
          <MdNavigateBefore
            className={`${student ? 'hidden' : ''} btn`}
            onClick={cntMinus}
          />
        )) || (
          <MdNavigateBefore className={`${student ? 'hidden' : ''} disbtn`} />
        )}
        {/* <PictureGame {...response[0][cnt]} /> */}
        <ClassPictureGame {...response[0][cnt]} />
        {(cnt < request.num - 1 && (
          <MdNavigateNext
            className={`${student ? 'hidden' : ''} btn`}
            onClick={cntPlus}
          />
        )) || (
          <MdNavigateNext className={`${student ? 'hidden' : ''} disbtn`} />
        )}
      </S.Board>
      <S.CountinueBtn
        type="button"
        className={`${student ? 'hidden' : ''}`}
        onClick={handleEndGame}
      >
        클래스 종료
      </S.CountinueBtn>
    </S.ProgramSection>
  );
}

const S = {
  ProgramSection: styled.div`
    ${tw`max-h-full flex-col`}
  `,
  CountinueBtn: styled.button`
    ${tw`absolute bottom-[7vh] right-[6vh] p-3 rounded font-bold text-xl bg-white`}
  `,
  Title: styled.div`
    ${tw` flex text-3xl justify-between min-h-[40px] font-bold text-white mt-5 mx-6`}
  `,
  Context: styled.p`
    ${tw` flex text-2xl justify-center font-bold text-white`}
  `,
  Board: styled.div`
    ${tw`flex justify-around items-center max-h-full`}
    .btn {
      ${tw`border-2 rounded-full text-6xl text-brand hover:cursor-pointer bg-white`}
    }
    .disbtn {
      ${tw`cursor-not-allowed border-2 rounded-full text-6xl invisible`}
    }
  `,
};
