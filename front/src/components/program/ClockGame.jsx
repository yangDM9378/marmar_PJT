/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext, useEffect } from 'react';
import { SttContext } from '../../context/SttContext';

export default function ClockGame({ imagePath, answer }) {
  const { getQuestion } = useContext(SttContext);

  useEffect(() => {
    console.log(answer);
    getQuestion(answer);
  }, [answer]);

  return (
    <S.ClockGame>
      <S.ClockImg src={imagePath} />
      <S.watchQuestion>watchQuestion: {answer}</S.watchQuestion>
    </S.ClockGame>
  );
}

const S = {
  ClockGame: styled.div`
    ${tw`flex-col border`}
  `,
  ClockImg: styled.img`
    ${tw`rounded-sm `}
    width: 300px;
    height: 300px;
  `,
  watchQuestion: styled.div`
    ${tw`flex justify-center items-center h-14 text-2xl`}
  `,
};
