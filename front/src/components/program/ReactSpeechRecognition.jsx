/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext, useEffect } from 'react';
import { SttContext } from '../../context/SttContext';

export default function ReactSpeechRecognition({ answer }) {
  const { speechStart, speechStop, getQuestion } = useContext(SttContext);

  useEffect(() => {
    getQuestion(answer);
  }, [answer]);

  return (
    <S.RecognitionSection>
      <button type="button" onClick={speechStart}>
        녹음시작
      </button>

      <button type="button" onClick={speechStop}>
        녹음완료
      </button>
    </S.RecognitionSection>
  );
}

const S = {
  RecognitionSection: styled.div`
    ${tw`flex justify-center items-center min-h-[100px]`}
  `,
};
