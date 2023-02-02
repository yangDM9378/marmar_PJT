/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext, useEffect } from 'react';
import { SttContext } from '../../context/SttContext';

export default function ClockGame({ imagePath, voicePath, watchQuestion }) {
  const { getQuestion } = useContext(SttContext);

  useEffect(() => {
    getQuestion(watchQuestion);
  }, []);

  return (
    <S.ClockGame>
      <S.ClockImg src={imagePath} />
      <S.watchQuestion>watchQuestion: {watchQuestion}</S.watchQuestion>
    </S.ClockGame>
  );
}

const S = {
  ClockGame: styled.div`
    ${tw`flex-col border`}
  `,
  ClockImg: styled.img`
    ${tw`rounded-sm `}
    width:400px;
    height: inherit;
  `,
  watchQuestion: styled.div`
    ${tw`flex justify-center items-center h-14 text-2xl`}
  `,
};
