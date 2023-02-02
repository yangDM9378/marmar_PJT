/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */

import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SttContext } from '../../context/SttContext';

export default function WordGame({ imagePath, wordSpeakingQuestion }) {
  const { getQuestion } = useContext(SttContext);

  useEffect(() => {
    getQuestion(wordSpeakingQuestion);
  }, []);
  return (
    <S.WordGame>
      <S.WordImg src={imagePath} className="w-12 h-10 pt-1" />
      <S.WordSpeakingQuestion>
        WordSpeakingQuestion: {wordSpeakingQuestion}
      </S.WordSpeakingQuestion>
    </S.WordGame>
  );
}

const S = {
  WordGame: styled.div`
    ${tw`flex-col border`}
  `,
  WordImg: styled.img`
    ${tw`rounded-sm `}
    width:150px;
    height: inherit;
  `,
  WordSpeakingQuestion: styled.div`
    ${tw`flex justify-center items-center h-14 text-2xl`}
  `,
};
