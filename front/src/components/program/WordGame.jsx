/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function WordGame({ num, wordSpeakingQuestion, imagePath }) {
  return (
    <S.WordGame>
      <img src="word/img/1.png" className="w-12 h-10 pt-1" />
      <S.WordSpeakingQuestion>{wordSpeakingQuestion}</S.WordSpeakingQuestion>
    </S.WordGame>
  );
}

const S = {
  WordGame: styled.div`
    ${tw`flex-col border`}
  `,
  WordImg: styled.img`
    ${tw`rounded-sm `}
  `,
  WordSpeakingQuestion: styled.div`
    ${tw`flex justify-center items-center h-14 text-2xl`}
  `,
};
