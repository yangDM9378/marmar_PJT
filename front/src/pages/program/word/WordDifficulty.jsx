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
    ${tw`flex bg-brand min-h-[100vh] mt-[8vh] p-[4vh] justify-center items-center`}

  `,
  ProgramBox: styled.div`
    ${tw`flex-col max-h-[80vh] max-w-[80vh] bg-white rounded-3xl p-12`}
    @media screen and (max-width: 1000px) {
      margin: 0px 100px;
    }
  `,
  ProgramHeader: styled.h1`
    ${tw`font-cafe24 text-center text-[6vh]`}
  `,
  DiffSection: styled.div`
    ${tw`flex mt-[3vh] p-[3vh] justify-evenly`}

    @media screen and (max-width: 1000px) {
      min-height: 400px;
      flex-direction: column;
      align-items: center;
    }
  `,
  DiffLink: styled(Link)`
    ${tw`flex justify-center items-center bg-yellow-300 rounded-[4vh] m-[1.2vh] w-[30vh] h-[25vh]`}
    @media screen and (max-width: 1000px) {
      width: 150px;
      height: 80px;
    }
    &:hover {
      border: 5px solid;
    }
  `,
  DiffH1: styled.h1`
    ${tw`font-cafe24 text-[8vh]`}
    @media screen and (max-width: 1000px) {
      font-size: 50px;
    }
  `,
};
