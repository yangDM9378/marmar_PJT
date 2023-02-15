/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */

import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SttContext } from '../../../context/SttContext';

export default function ClassWordGame({ imagePath, answer }) {
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
    ${tw`flex-col rounded-xl text-center max-h-[30vh]`}
    .img {
      ${tw`bg-white rounded-t-xl p-3 w-full max-h-[30vh] border-8 border-brand`}
    }
    .word {
      ${tw`text-[50px] bg-brand text-white rounded-b-xl`}
    }
    div {
      ${tw`pb-3 font-cafe24`}
    }
  `,
};
