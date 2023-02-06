/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { getPictureApi } from '../../../api/programApi';
import PictureGame from '../../../components/program/PictureGame';
import { SttContext } from '../../../context/SttContext';

export default function PictureProgram() {
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [PictureData, setPictureData] = useState([[]]);
  const { setIsCheckArr } = useContext(SttContext);
  const navigate = useNavigate();

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
  const [cnt, setCnt] = useState(0);
  const cntPlus = () => {
    cnt < 9 && setCnt(cnt + 1);
    setIsCheckArr([false, false, false, false]);
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    setIsCheckArr([false, false, false, false]);
  };

  const goPictureDifficulty = () => {
    navigate(`/PictureDifficulty`);
  };

  return (
    <S.PictureProgramSection>
      <S.PictureDifficulty>
        {difficulty}
        <button type="button" onClick={goPictureDifficulty}>
          처음으로
        </button>
      </S.PictureDifficulty>
      <S.PictureTitle>그림 맞추기</S.PictureTitle>
      <S.PictureContext>
        [Q{cnt + 1}] 다음 그림 중 관련없는 하나를 고르세요.
      </S.PictureContext>
      <S.PictureBtnAndGame>
        <S.PictureBtn>
          {(cnt > 0 && (
            <MdNavigateBefore className="btn" onClick={cntMinus} />
          )) || <MdNavigateBefore className="disbtn" />}
        </S.PictureBtn>
        <S.PictureBtn>
          {(cnt < 4 && (
            <MdNavigateNext className="btn" onClick={cntPlus} />
          )) || <MdNavigateNext className="disbtn" />}
        </S.PictureBtn>
      </S.PictureBtnAndGame>
      <PictureGame {...PictureData[0][cnt]} />
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
  PictureBtn: styled.div`
    ${tw`flex justify-center items-center`}
    .btn {
      ${tw`border-2 rounded-full text-6xl text-brand`}
    }
    .disbtn {
      ${tw`cursor-not-allowed border-2 rounded-full text-6xl text-gray-600`}
    }
  `,
};
