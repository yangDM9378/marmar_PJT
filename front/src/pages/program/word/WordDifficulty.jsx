import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export default function WordDifficulty() {
  return (
    <S.WordSection>
      <S.WordBox>
        <S.WordHeader>단어 읽기</S.WordHeader>
        <S.WordMiniBox>
          <Link to="/WordProgram" state={{ difficulty: 'high' }}>
            <S.WordUserBox>
              <S.WordUserH1>상</S.WordUserH1>
              <img src="" alt="" />
            </S.WordUserBox>
          </Link>
          <Link to="/WordProgram" state={{ difficulty: 'mid' }}>
            <S.WordUserBox>
              <S.WordUserH1>중</S.WordUserH1>
              <img src="" alt="" />
            </S.WordUserBox>
          </Link>
          <Link to="/WordProgram" state={{ difficulty: 'low' }}>
            <S.WordUserBox>
              <S.WordUserH1>하</S.WordUserH1>
              <img src="" alt="" />
            </S.WordUserBox>
          </Link>
        </S.WordMiniBox>
      </S.WordBox>
    </S.WordSection>
  );
}

const S = {
  WordSection: styled.div`
    ${tw`px-10 bg-brand min-h-[800px] flex justify-center items-center`}
  `,
  WordBox: styled.div`
    ${tw`bg-white rounded-3xl w-[800px] h-[650px] p-10 `}
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  `,
  WordHeader: styled.h1`
    ${tw`font-extrabold text-7xl text-center p-2 font-cafe24 `}
    color: darkblue;
  `,
  WordMiniBox: styled.div`
    ${tw`p-5 flex justify-around `}
  `,
  WordUserBox: styled.div`
    ${tw`bg-yellow-300 rounded-3xl w-[200px] h-[200px] p-10`}
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 30%;
  `,
  WordUserH1: styled.h1`
    ${tw`font-extrabold text-7xl text-center p-2 font-cafe24`}
  `,
};
