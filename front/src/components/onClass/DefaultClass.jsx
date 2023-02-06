import styled from 'styled-components';
import tw from 'twin.macro';
import React from 'react';

export default function DefaultClass() {
  return (
    <S.ClassGameSection>
      <S.ClassGameInfo>단어읽기</S.ClassGameInfo>
      <S.ClassGameInfo>시계읽기</S.ClassGameInfo>
      <S.ClassGameInfo>그림선택</S.ClassGameInfo>
    </S.ClassGameSection>
  );
}
const S = {
  ClassGameSection: styled.section`
    border: 4px solid;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ClassGameInfo: styled.div`
    border: 4px solid;
    flex: 1;
    margin: 10px;
    height: 400px;
  `,
};
