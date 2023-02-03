/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useContext } from 'react';
import { OnClassContext } from '../../context/OnClassContext';
import PictureGame from '../program/PictureGame';

export default function PictureClass() {
  // 데이터 가져오기
  const { request, response } = useContext(OnClassContext);

  // 문제 넘기기 관련
  const [cnt, setCnt] = useState(0);
  const cntPlus = game => {
    console.log(request);
    cnt < request.num && setCnt(request.num + 1);
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
  };

  return (
    <S.PictureProgramSection>
      <S.PictureDifficulty>{request.difficulty}</S.PictureDifficulty>
      <S.PictureTitle>{request.program}</S.PictureTitle>
      <S.PictureContext>
        [Q{cnt + 1}] 다음 시계를 보고 시간을 말해보세요.
      </S.PictureContext>
      <S.PictureBtnAndGame>
        {(cnt > 0 && (
          <button type="button" onClick={cntMinus}>
            이전
          </button>
        )) || <S.ButtonDisable type="button">이전</S.ButtonDisable>}
        <button type="button" onClick={cntPlus}>
          다음
        </button>
      </S.PictureBtnAndGame>
      <PictureGame {...response[cnt]} />
    </S.PictureProgramSection>
  );
}

const S = {
  PictureProgramSection: styled.div`
    ${tw` bg-brand min-h-[800px] flex-col`}
  `,
  PictureDifficulty: styled.h4`
    ${tw`flex text-xl justify-end `}
  `,
  PictureTitle: styled.h1`
    ${tw` flex text-4xl min-h-[60px] justify-center items-center font-bold text-white`}
  `,
  PictureContext: styled.p`
    ${tw` flex text-xl min-h-[100px] justify-center font-thin text-white`}
  `,
  PictureBtnAndGame: styled.div`
    ${tw`flex justify-around`}
  `,
  ButtonDisable: styled.button`
    ${tw`cursor-not-allowed`}
  `,
};
