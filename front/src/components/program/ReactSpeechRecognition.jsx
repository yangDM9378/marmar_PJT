import styled from 'styled-components';
import tw from 'twin.macro';
import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export default function ReactSpeechRecognition({ onStop }) {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const speechStart = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ko',
    });

  const speechStop = () => {
    console.log(transcript);
    SpeechRecognition.abortListening({
      continuous: false,
    });
    console.log(transcript);
    console.log(listening);
    onStop(transcript);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>speaking</span>;
  }

  return (
    <S.RecognitionSection>
      {!listening && (
        <button type="button" onClick={speechStart}>
          녹음시작
        </button>
      )}
      {listening && (
        <button type="button" onClick={speechStop}>
          녹음완료
        </button>
      )}
    </S.RecognitionSection>
  );
}

const S = {
  RecognitionSection: styled.div`
    ${tw`flex justify-center items-center min-h-[100px]`}
  `,
};
