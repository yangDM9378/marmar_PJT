/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext, useEffect } from 'react';
import { BsFillMicFill } from 'react-icons/bs';
import { IoIosSquare } from 'react-icons/io';
import { SttContext } from '../../context/SttContext';

export default function ReactSpeechRecognition({ answer }) {
  const { speechStart, speechStop, getQuestion, start } =
    useContext(SttContext);
  useEffect(() => {
    getQuestion(answer);
  }, [answer]);

  return (
    <S.RecognitionSection>
      {!start && (
        <S.BsFillMicFill onClick={speechStart}>
          <BsFillMicFill className="Icon" />
        </S.BsFillMicFill>
      )}
      {start && (
        <S.BsFillRecordFill onClick={speechStop}>
          <IoIosSquare className="Icon" />
        </S.BsFillRecordFill>
      )}
    </S.RecognitionSection>
  );
}

const S = {
  RecognitionSection: styled.div`
    ${tw`flex justify-center items-center min-h-[10rem]`}
  `,
  BsFillMicFill: styled.div`
    ${tw`flex bg-brand justify-center items-center rounded-full m-3`}
    width: 6rem;
    height: 6rem;
    .Icon {
      ${tw` text-white`}
      font-size: 3rem;
    }
  `,
  BsFillRecordFill: styled.div`
    ${tw`flex bg-yellow-300 justify-center items-center rounded-full m-3`}
    width: 6rem;
    height: 6rem;
    .Icon {
      ${tw` text-white`}
      font-size: 3rem;
    }
  `,
};
