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
    <S.WordGame>
      <S.WordGameImg>
        <S.WordImgCard>
          <img className="img" src={imagePath} />
          <div className="word">{answer}</div>
        </S.WordImgCard>
      </S.WordGameImg>
    </S.WordGame>
  );
}

const S = {
  WordGame: styled.div`
    ${tw`flex justify-center items-center min-h-[20rem]`}
  `,
  WordGameImg: styled.div`
    ${tw`flex justify-center items-center`}
  `,
  WordImgCard: styled.div`
    ${tw`flex-col rounded-xl text-center border-8 border-brand `}
    .img {
      ${tw`bg-white rounded-xl p-3`}
      width: 300px;
      height: 300px;
    }
    ,
    .word {
      ${tw`text-4xl bg-brand m-2 text-white`}
    }
  `,
};
