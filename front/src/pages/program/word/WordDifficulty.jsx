import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export default function WordDifficulty() {
  return (
    <S.SignUpSection>
      <S.SignUpBox>
        <S.SignUpHeader>단어 읽기</S.SignUpHeader>
        <S.SignUpMiniBox>
          <Link to="/WordProgram" state={{ difficulty: 'high' }}>
            <S.SignUpUserBox>
              <S.SignUpUserH1>상</S.SignUpUserH1>
              <img src="" alt="" />
            </S.SignUpUserBox>
          </Link>
          <Link to="/WordProgram" state={{ difficulty: 'mid' }}>
            <S.SignUpUserBox>
              <S.SignUpUserH1>중</S.SignUpUserH1>
              <img src="" alt="" />
            </S.SignUpUserBox>
          </Link>
          <Link to="/WordProgram" state={{ difficulty: 'low' }}>
            <S.SignUpUserBox>
              <S.SignUpUserH1>하</S.SignUpUserH1>
              <img src="" alt="" />
            </S.SignUpUserBox>
          </Link>
        </S.SignUpMiniBox>
      </S.SignUpBox>
    </S.SignUpSection>
  );
}

const S = {
  SignUpSection: styled.div`
    ${tw`px-10 bg-brand min-h-[800px] flex justify-center items-center`}
  `,
  SignUpBox: styled.div`
    ${tw`bg-white rounded-3xl w-[650px] h-[650px] p-10`}
  `,
  SignUpHeader: styled.h1`
    ${tw`font-extrabold text-2xl text-center p-2 font-cafe24`}
  `,
  SignUpMiniBox: styled.div`
    ${tw`p-5 flex justify-around`}
  `,
  SignUpUserBox: styled.div`
    ${tw`bg-yellow-300 rounded-3xl w-[250px] h-[450px] p-10`}
  `,
  SignUpUserH1: styled.h1`
    ${tw`font-extrabold text-2xl text-center p-2 font-cafe24`}
  `,
};
