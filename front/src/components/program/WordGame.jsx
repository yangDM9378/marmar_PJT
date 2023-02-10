/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */

import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SttContext } from '../../context/SttContext';

export default function WordGame({ imagePath, answer }) {
  const { getQuestion } = useContext(SttContext);

  useEffect(() => {
    getQuestion(answer);
  }, [answer]);

  return (
    <S.WordGameImg>
      <S.WordImgCard>
        <img className="img" src={imagePath} />
        <div className="word">{answer}</div>
      </S.WordImgCard>
    </S.WordGameImg>
  );
}

const S = {
  WordGameImg: styled.div`
    ${tw`flex justify-center items-center`}
  `,
  WordImgCard: styled.div`
    ${tw`flex-col rounded-xl text-center border-8 border-brand  `}
    .img {
      ${tw`bg-white rounded-l p-3 w-[300px] h-[300px]`}
    }
    .word {
      ${tw`text-[50px] bg-brand mt-2 text-white`}
    }
  `,
};
