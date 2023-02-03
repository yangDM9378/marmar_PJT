import styled from 'styled-components';
import tw from 'twin.macro';
import React from 'react';

export default function DefaultClass() {
  return (
    <S.ClassGameDiv>
      <S.ClassGameHeader>문제를 설정해주세요!</S.ClassGameHeader>
    </S.ClassGameDiv>
  );
}

const S = {
  ClassGameDiv: styled.div`
    ${tw` bg-brand min-h-[800px] flex`}
  `,
  ClassGameHeader: styled.div`
    font-size: 100px;
    align-self: center;
  `,
};
