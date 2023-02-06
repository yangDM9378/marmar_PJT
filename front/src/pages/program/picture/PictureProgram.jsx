/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPictureApi } from '../../../api/programApi';
import PictureGame from '../../../components/program/PictureGame';
import { SttContext } from '../../../context/SttContext';

export default function PictureProgram() {
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [PictureData, setPictureData] = useState([]);
  const { setIsCheckArr } = useContext(SttContext);
  // 데이터 가져오기
  useEffect(() => {
    getPictureData();
  }, [difficulty]);

  const getPictureData = async () => {
    const response = await getPictureApi(difficulty);
    console.log(response.data);
    setPictureData(response.data);
  };

  // 문제 넘기기 관련
  const navigate = useNavigate();
  const [cnt, setCnt] = useState(0);
  const cntPlus = () => {
    cnt < 9 && setCnt(cnt + 1);
    cnt >= 9 && navigate(`PictureFinish`);
    setIsCheckArr([false, false, false, false]);
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    setIsCheckArr([false, false, false, false]);
  };

  return (
    <S.PictureProgramSection>
      <S.PictureDifficulty>{difficulty}</S.PictureDifficulty>
      <S.PictureTitle>그림 맞추기</S.PictureTitle>
      <S.PictureContext>
        [Q{cnt + 1}] 다음 그림 중 관련없는 하나를 고르세요.
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
      <PictureGame {...PictureData[cnt]} />
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
