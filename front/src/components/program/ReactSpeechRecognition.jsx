/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext } from 'react';
import { SttContext } from '../../context/SttContext';

export default function ReactSpeechRecognition() {
  const { speechStart, speechStop } = useContext(SttContext);

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
