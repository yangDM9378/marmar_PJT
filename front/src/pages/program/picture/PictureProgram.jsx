/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { BsFillReplyAllFill } from 'react-icons/bs';
import { getPictureApi } from '../../../api/programApi';
import PictureGame from '../../../components/program/PictureGame';
import { SttContext } from '../../../context/SttContext';
import CorrectModal from '../../../components/program/CorrectModal';
import WrongModal from '../../../components/program/WrongModal';
import NoModal from '../../../components/program/NoModal';

export default function PictureProgram() {
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [PictureData, setPictureData] = useState([[]]);
  const {
    setIsCheckArr,
    modalCorrect,
    setModalCorrect,
    modalWrong,
    setModalWrong,
    modalNo,
    setModalNo,
    soundNext,
  } = useContext(SttContext);
  const navigate = useNavigate();

  // 데이터 가져오기
  useEffect(() => {
    getPictureData();
  }, [difficulty]);

  const getPictureData = async () => {
    const response = await getPictureApi(difficulty);
    setPictureData(response.data);
  };

  // 문제 넘기기 관련
  const [cnt, setCnt] = useState(0);
  const cntPlus = () => {
    cnt < 9 && setCnt(cnt + 1);
    soundNext();
    setIsCheckArr([false, false, false, false]);
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    soundNext();
    setIsCheckArr([false, false, false, false]);
  };

  const goPictureDifficulty = () => {
    navigate(`/PictureDifficulty`);
  };

  return (
    <S.PictureProgramSection>
      <CorrectModal
        isOpen={modalCorrect}
        close={() => {
          setModalCorrect(false);
        }}
      />
      <WrongModal
        isOpen={modalWrong}
        close={() => {
          setModalWrong(false);
        }}
      />
      <NoModal
        isOpen={modalNo}
        close={() => {
          setModalNo(false);
        }}
      />

      <S.PictureDifficulty>
        <button type="button" onClick={goPictureDifficulty}>
          <BsFillReplyAllFill />
        </button>
      </S.PictureDifficulty>

      <S.PictureTitle>다른 그림 찾기</S.PictureTitle>
      <S.PictureContext>
        다음 그림 중 관련없는 하나를 고르세요.
      </S.PictureContext>
      <S.PictureBody>
        <S.PictureBtnAndGame>
          <S.PictureBtn>
            {(cnt > 0 && (
              <MdNavigateBefore className="btn" onClick={cntMinus} />
            )) || <MdNavigateBefore className="disbtn" />}
          </S.PictureBtn>
          <PictureGame {...PictureData[0][cnt]} />
          <S.PictureBtn>
            {(cnt < 4 && (
              <MdNavigateNext className="btn" onClick={cntPlus} />
            )) || <MdNavigateNext className="disbtn" />}
          </S.PictureBtn>
        </S.PictureBtnAndGame>
      </S.PictureBody>
    </S.PictureProgramSection>
  );
}

const S = {
  PictureProgramSection: styled.div`
    ${tw` bg-brand mt-[80px]`}
  `,
  PictureDifficulty: styled.h4`
    ${tw`flex text-[60px] justify-end items-center m-6 text-white pt-5`}
  `,
  PictureTitle: styled.div`
    ${tw` flex text-[50px] h-[40px] mb-5 justify-center items-center font-cafe24 text-white`}
  `,
  PictureContext: styled.div`
    ${tw` flex text-2xl mb-10 h-[500] justify-center font-tway text-white`}
  `,
  PictureBody: styled.div`
    ${tw`flex flex-col justify-center items-stretch p-[90px] bg-white`}
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
      ${tw`cursor-not-allowed border-2 rounded-full text-6xl`}
    }
  `,
};
