import styled from 'styled-components';
import tw from 'twin.macro';
import React from 'react';
import { Link } from 'react-router-dom';

export default function PictureDifficulty() {
  return (
    <S.ProgramSection>
      <S.ProgramBox>
        <S.ProgramHeader>💡그림 맞추기</S.ProgramHeader>
        <S.DiffSection>
          <S.DiffLink to="/PictureProgram" state={{ difficulty: 'high' }}>
            <S.DiffH1>상</S.DiffH1>
          </S.DiffLink>
          <S.DiffLink to="/PictureProgram" state={{ difficulty: 'middle' }}>
            <S.DiffH1>중</S.DiffH1>
          </S.DiffLink>
          <S.DiffLink to="/PictureProgram" state={{ difficulty: 'low' }}>
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
    @media screen and (max-width: 720px) {
      ${tw`h-[80%] w-[60%]`}
      margin: 70px;
    }
  `,
  ProgramHeader: styled.h1`
    ${tw`font-cafe24 text-center text-[50px]`}
    @media screen and (max-width: 720px) {
      font-size: 40px;
    }
  `,
  DiffSection: styled.div`
    ${tw`flex mt-9 justify-evenly`}
    @media screen and (max-width: 720px) {
      min-height: 300px;
      flex-direction: column;
      margin: 0px;
    }
  `,
  DiffLink: styled(Link)`
    ${tw`flex justify-center items-center bg-yellow-300 rounded-3xl mx-2 my-4 w-[150px] h-[150px]`}
    @media screen and (max-width: 720px) {
      width: 150px;
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
    ${tw`font-cafe24 text-[8vh]`}
    @media screen and (max-width: 720px) {
      font-size: 50px;
    }
  `,
};
