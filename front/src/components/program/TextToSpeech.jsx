/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import Speech from 'speak-tts';
import { HiSpeakerphone } from 'react-icons/hi';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function TextToSpeech({ answer }) {
  const [say, setSay] = useState('');

  const getSay = () => {
    setSay(answer);
  };

  useEffect(() => {
    getSay(answer);
  }, [answer]);

  const speech = new Speech();
  speech.init({
    lang: 'ko-KR',
  });

  const handleClick = () => {
    console.log(say);
    speech.speak({
      text: say,
    });
  };

  return (
    <S.TTSSection>
      <S.HiSpeakerphone>
        <HiSpeakerphone className="Icon" onClick={handleClick}>
          Speak
        </HiSpeakerphone>
      </S.HiSpeakerphone>
    </S.TTSSection>
  );
}

const S = {
  TTSSection: styled.div`
    ${tw`flex justify-center items-center min-h-[10rem]`}
  `,
  HiSpeakerphone: styled.div`
    ${tw`flex bg-brand justify-center items-center rounded-full m-3`}
    width: 6rem;
    height: 6rem;
    .Icon {
      ${tw` text-white`}
      font-size: 3rem;
    }
  `,
};
