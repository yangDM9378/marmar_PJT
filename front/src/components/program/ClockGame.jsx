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
    <S.Game>
      imagePath: <S.Img src={imagePath} />
      voicePath: {voicePath}
      <S.SpeakingQuestion>watchQuestion: {watchQuestion}</S.SpeakingQuestion>
    </S.Game>
  );
}

const S = {
  Game: styled.div`
    ${tw`flex-col border`}
  `,
  Img: styled.img`
    ${tw`rounded-sm `}
    width:400px;
    height: inherit;
  `,
  SpeakingQuestion: styled.div`
    ${tw`flex justify-center items-center h-14 text-2xl`}
  `,
};
