/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */

import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext, useEffect } from 'react';
import { SttContext } from '../../context/SttContext';

export default function ClockGame({ imagePath, answer }) {
  const { getQuestion } = useContext(SttContext);

  useEffect(() => {
    getQuestion(answer);
  }, [answer]);

  return (
    <S.ClockGameImg>
      <S.ClockImgCard>
        <img className="img" src={imagePath} />
        {/* <div className="Clock">{answer}</div> */}
      </S.ClockImgCard>
    </S.ClockGameImg>
  );
}

const S = {
  ClockGameImg: styled.div`
    ${tw`flex justify-center items-center`}
  `,
  ClockImgCard: styled.div`
    ${tw`flex-col rounded-xl text-center border-8 border-brand  `}
    .img {
      ${tw`bg-white rounded-l p-3 w-[300px] h-[300px]`}
    }
    /* .Clock {
      ${tw`text-[50px] bg-brand mt-2 text-white`}
    } */
  `,
};
