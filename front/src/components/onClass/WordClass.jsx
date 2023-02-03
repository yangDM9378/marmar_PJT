/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useContext } from 'react';
import { OnClassContext } from '../../context/OnClassContext';
import WordGame from '../program/WordGame';

export default function WordClass() {
  // 데이터 가져오기
  const { request, setRequest, response, setResponse } =
    useContext(OnClassContext);

  // 문제 넘기기 관련
  const [cnt, setCnt] = useState(0);
  const cntPlus = () => {
    cnt + 1 < request.num && setCnt(cnt + 1);
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
  };
  const handleEndGame = () => {
    setRequest({
      game: '',
      difficulty: '',
      num: 0,
    });
    setResponse(['default']);
  };

  return (
    <S.WordProgramSection>
      <S.WordDifficulty>{request.difficulty}</S.WordDifficulty>
      <S.WordTitle>단어 읽기</S.WordTitle>
      <S.WordContext>
        [Q{cnt + 1}] 다음 단어와 그림을 보고 시간을 말해보세요.
      </S.WordContext>
      <S.WordBtnAndGame>
        {cnt > 0 && cnt <= request.num - 1 && (
          <button type="button" onClick={cntMinus}>
            이전
          </button>
        )}

        {cnt === request.num - 1 && (
          <button type="button" onClick={handleEndGame}>
            처음으로
          </button>
        )}

        {cnt < request.num - 1 && (
          <button type="button" onClick={cntPlus}>
            다음
          </button>
        )}
      </S.WordBtnAndGame>
      <WordGame {...response[cnt]} />
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
