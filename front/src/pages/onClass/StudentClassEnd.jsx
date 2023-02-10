import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function StudentClassEnd() {
  return (
    <S.Body>
      <S.Box>
        <S.Header>
          수업은 즐거우셨나요?
          <p>오늘 선생님과 함께 한 게임 혼자서도 할 수 있어요!</p>
        </S.Header>
        <S.Main>
          <Link to="/WordDifficulty">
            <S.ContentBox>
              <div>
                단어
                <br />
                읽기
              </div>
            </S.ContentBox>
          </Link>
          <Link to="/ClockDifficulty">
            <S.ContentBox>
              시계
              <br />
              읽기
            </S.ContentBox>
          </Link>
          <Link to="/PictureDifficulty">
            <S.ContentBox>
              그림
              <br />
              맞추기
            </S.ContentBox>
          </Link>
        </S.Main>
      </S.Box>
    </S.Body>
  );
}

const S = {
  Body: styled.div`
    ${tw`mt-[100px] min-h-[71vh] bg-brand flex justify-center items-center`}
  `,
  Box: styled.div`
    ${tw`bg-white rounded-3xl w-[800px] h-[450px] p-10`}
  `,
  Header: styled.div`
    ${tw`font-extrabold text-3xl text-center p-2 font-cafe24`}
    p {
      ${tw`text-2xl font-cafe24 mt-3`}
    }
  `,
  Main: styled.div`
    ${tw`flex justify-around`}
  `,
  ContentBox: styled.div`
    ${tw`bg-yellow-300 h-[200px] w-[200px] rounded-3xl m-5 flex justify-center items-center text-center font-cafe24 text-4xl`}
    &:hover {
      outline: 5px solid;
    }
  `,
};
