/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function WordGame({ num, wordSpeakingQuestion, imagePath }) {
  return (
    <S.WordGame>
      <S.WordImg
        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
        alt=""
      />
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
    width:400px;
    height: inherit;
  `,
  WordSpeakingQuestion: styled.div`
    ${tw`flex justify-center items-center h-14 text-2xl`}
  `,
};
