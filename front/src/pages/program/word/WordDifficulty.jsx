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
    ${tw`flex bg-brand h-[650px] mt-[100px] justify-center items-center`}  
    `,
  ProgramBox: styled.div`
    ${tw` flex flex-col justify-center items-center h-[430px] w-[600px] bg-white rounded-3xl`}
  `,
  ProgramHeader: styled.h1`
    ${tw`font-cafe24 text-center text-[50px]`}
  `,
  DiffSection: styled.div`
    ${tw`flex mt-9 justify-evenly`}
  `,
  DiffLink: styled(Link)`
    ${tw`flex justify-center items-center bg-yellow-300 rounded-3xl mx-2 my-4 w-[150px] h-[150px]`}
    &:hover {
      border: 5px solid;
    }
  `,
  DiffH1: styled.h1`
    ${tw`font-cafe24 text-[8vh]`}
  `,
};
