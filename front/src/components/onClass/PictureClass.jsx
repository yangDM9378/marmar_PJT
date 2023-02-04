/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext } from 'react';
import { OnClassContext } from '../../context/OnClassContext';
import PictureGame from '../program/PictureGame';

export default function PictureClass() {
  // 데이터 가져오기
  const {
    request,
    setRequest,
    response,
    setResponse,
    setIsCheckArr,
    cnt,
    setCnt,
  } = useContext(OnClassContext);

  // 문제 넘기기 관련
  const cntPlus = () => {
    setIsCheckArr([false, false, false, false]);
    cnt < request.num - 1 && setCnt(cnt + 1);
  };
  const cntMinus = () => {
    setIsCheckArr([false, false, false, false]);
    cnt > 0 && setCnt(cnt - 1);
  };
  const handleEndGame = () => {
    setRequest({
      game: '',
      difficulty: '',
      num: 0,
    });
    setIsCheckArr([false, false, false, false]);
    setResponse(['default']);
  };

  return (
    <S.ProgramSection>
      <S.CountinueBtn>
        <button type="button" onClick={handleEndGame}>
          처음으로
        </button>
      </S.CountinueBtn>
      <S.Title>Picture</S.Title>
      <S.Context>
        [Q{cnt + 1}] 다음 사진 중 관계없는 사진을 선택하세요.
      </S.Context>
      <PictureGame {...response[cnt]} />
      <S.Button>
        {cnt > 0 && cnt <= request.num - 1 && (
          <button type="button" onClick={cntMinus}>
            이전
          </button>
        )}
        {cnt < request.num - 1 && (
          <button type="button" onClick={cntPlus}>
            다음
          </button>
        )}
      </S.Button>
    </S.ProgramSection>
  );
}

const S = {
  ProgramSection: styled.div`
    ${tw` bg-brand min-h-[800px] flex-col`}
  `,
  CountinueBtn: styled.div`
    ${tw`flex text-xl min-h-[60px] justify-end`}
  `,
  Title: styled.h1`
    ${tw` flex text-4xl min-h-[60px] justify-center items-center font-bold text-white`}
  `,
  Context: styled.p`
    ${tw` flex text-xl justify-center font-thin text-white`}
  `,
  Button: styled.div`
    ${tw`flex justify-around`}
  `,
};
