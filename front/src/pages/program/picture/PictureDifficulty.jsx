import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export default function PictureDifficulty() {
  return (
    <S.PictureSection>
      <S.PictureBox>
        <S.PictureHeader>그림 찾기</S.PictureHeader>
        <S.PictureMiniBox>
          <Link to="/PictureProgram" state={{ difficulty: 'high' }}>
            <S.PictureUserBox>
              <S.PictureUserH1>상</S.PictureUserH1>
              <img src="" alt="" />
            </S.PictureUserBox>
          </Link>
          <Link to="/PictureProgram" state={{ difficulty: 'mid' }}>
            <S.PictureUserBox>
              <S.PictureUserH1>중</S.PictureUserH1>
              <img src="" alt="" />
            </S.PictureUserBox>
          </Link>
          <Link to="/PictureProgram" state={{ difficulty: 'low' }}>
            <S.PictureUserBox>
              <S.PictureUserH1>하</S.PictureUserH1>
              <img src="" alt="" />
            </S.PictureUserBox>
          </Link>
        </S.PictureMiniBox>
      </S.PictureBox>
    </S.PictureSection>
  );
}

const S = {
  PictureSection: styled.div`
    ${tw`px-10 bg-brand min-h-[800px] flex justify-center items-center`}
  `,
  PictureBox: styled.div`
    ${tw`bg-white rounded-3xl w-[800px] h-[650px] p-10 `}
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  `,
  PictureHeader: styled.h1`
    ${tw`font-extrabold text-7xl text-center p-2 font-cafe24 `}
    color: darkblue;
  `,
  PictureMiniBox: styled.div`
    ${tw`p-5 flex justify-around `}
  `,
  PictureUserBox: styled.div`
    ${tw`bg-yellow-300 rounded-3xl w-[200px] h-[200px] p-10`}
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 30%;
  `,
  PictureUserH1: styled.h1`
    ${tw`font-extrabold text-7xl text-center p-2 font-cafe24`}
  `,
};
