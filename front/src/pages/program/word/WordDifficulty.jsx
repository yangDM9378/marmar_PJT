/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export default function ClockDifficulty() {
  return (
    <S.ProgramSection>
      <S.ProgramBox>
        <S.ProgramHeader>🐣단어 읽기</S.ProgramHeader>
        <S.DiffSection>
          <S.DiffLink to="/WordProgram" state={{ difficulty: 'high' }}>
            <S.DiffH1>상</S.DiffH1>
          </S.DiffLink>
          <S.DiffLink to="/WordProgram" state={{ difficulty: 'mid' }}>
            <S.DiffH1>중</S.DiffH1>
          </S.DiffLink>
          <S.DiffLink to="/WordProgram" state={{ difficulty: 'low' }}>
            <S.DiffH1>하</S.DiffH1>
          </S.DiffLink>
        </S.DiffSection>
      </S.ProgramBox>
    </S.ProgramSection>
  );
}

const S = {
  ProgramSection: styled.div`
    ${tw`bg-brand  mt-12`}
    border: 4px solid red;
  `,
  ProgramBox: styled.div`
    ${tw`bg-white rounded-3xl `}
    @media screen and (max-width: 1000px) {
      margin: 0px 100px;
    }
  `,
  ProgramHeader: styled.h1`
    ${tw`font-cafe24`}
    text-align: center;
    font-size: 50px;
  `,
  DiffSection: styled.div`
    margin-top: 20px;
    padding: 20px;
    display: flex;
    justify-content: space-evenly;
    @media screen and (max-width: 1000px) {
      min-height: 400px;
      flex-direction: column;
      align-items: center;
    }
  `,
  DiffLink: styled(Link)`
    ${tw`bg-yellow-300`}
    border-radius: 25px;
    margin: 10px;
    width: 250px;
    height: 250px;
    @media screen and (max-width: 1000px) {
      width: 250px;
      height: 100px;
    }
    &:hover {
      border: 5px solid;
    }
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  DiffH1: styled.h1`
    ${tw`font-cafe24`}
    font-size: 80px;
    @media screen and (max-width: 1000px) {
      font-size: 50px;
    }
  `,
};
