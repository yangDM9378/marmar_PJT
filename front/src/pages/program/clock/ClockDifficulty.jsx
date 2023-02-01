import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export default function ClockDifficulty() {
  return (
    <S.ClockSection>
      <S.ClockBox>
        <S.ClockHeader>시계 읽기</S.ClockHeader>
        <S.ClockMiniBox>
          <Link to="/ClockProgram" state={{ difficulty: 'high' }}>
            <S.ClockUserBox>
              <S.ClockUserH1>상</S.ClockUserH1>
              <img src="" alt="" />
            </S.ClockUserBox>
          </Link>
          <Link to="/ClockProgram" state={{ difficulty: 'mid' }}>
            <S.ClockUserBox>
              <S.ClockUserH1>중</S.ClockUserH1>
              <img src="" alt="" />
            </S.ClockUserBox>
          </Link>
          <Link to="/ClockProgram" state={{ difficulty: 'low' }}>
            <S.ClockUserBox>
              <S.ClockUserH1>하</S.ClockUserH1>
              <img src="" alt="" />
            </S.ClockUserBox>
          </Link>
        </S.ClockMiniBox>
      </S.ClockBox>
    </S.ClockSection>
  );
}

const S = {
  ClockSection: styled.div`
    ${tw`px-10 bg-brand min-h-[800px] flex justify-center items-center`}
  `,
  ClockBox: styled.div`
    ${tw`bg-white rounded-3xl w-[800px] h-[650px] p-10 `}
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  `,
  ClockHeader: styled.h1`
    ${tw`font-extrabold text-7xl text-center p-2 font-cafe24 `}
    color: darkblue;
  `,
  ClockMiniBox: styled.div`
    ${tw`p-5 flex justify-around `}
  `,
  ClockUserBox: styled.div`
    ${tw`bg-yellow-300 rounded-3xl w-[200px] h-[200px] p-10`}
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 30%;
  `,
  ClockUserH1: styled.h1`
    ${tw`font-extrabold text-7xl text-center p-2 font-cafe24`}
  `,
};
