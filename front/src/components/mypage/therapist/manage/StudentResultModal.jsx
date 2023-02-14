/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import tw from 'twin.macro';
import Rater from 'react-rater';
import Slider from 'react-slick';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useQuery } from '@tanstack/react-query';
import { getResultApi } from '../../../../api/mypageApi';

export default function StudentResultModal({ isOpen, close, num, name }) {
  const { data: studentResult } = useQuery({
    queryKey: ['studentResult', num],
    queryFn: () => getResultApi(num),
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: (
      <S.Next>
        <GrFormNext className="text-6xl absolute left-12 top-6" />
      </S.Next>
    ),
    prevArrow: (
      <S.Prev>
        <GrFormPrevious className="text-6xl absolute right-12 top-6" />
      </S.Prev>
    ),
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      className="h-fit w-[900px] bg-white rounded-xl m-auto mt-[150px] p-20 pt-10 pb-5 border-red-300 border-2"
    >
      <S.Title>{name}의 수업일지</S.Title>
      {!studentResult && (
        <div className="text-center text-3xl font-cafe24 mb-5">
          수업 내역이 없습니다.
        </div>
      )}
      {studentResult && studentResult.data.length < 1 && (
        <div className="text-center text-3xl font-cafe24 mb-5">
          수업 내역이 없습니다.
        </div>
      )}
      <S.StyledSlider {...settings}>
        {studentResult &&
          studentResult.data.length > 1 &&
          studentResult.data.map((el, idx) => (
            <div key={el.num}>
              <S.Title>{el.evalDate}</S.Title>
              <S.MainSection>
                <S.RatingSection>
                  <S.InputBox>
                    <S.Label htmlFor="수행능력">
                      <span>수행능력</span>
                    </S.Label>
                    <S.Rater
                      total={5}
                      rating={el.evalAbility}
                      interactive={false}
                    />
                  </S.InputBox>

                  <S.InputBox>
                    <S.Label htmlFor="수업태도">
                      <span>수행태도</span>
                    </S.Label>
                    <S.Rater
                      total={5}
                      rating={el.evalAttitude}
                      interactive={false}
                    />
                  </S.InputBox>

                  <S.InputBox>
                    <S.Label htmlFor="수업집중도">
                      <span>수업집중도</span>
                    </S.Label>
                    <S.Rater
                      total={5}
                      rating={el.evalConcentration}
                      interactive={false}
                    />
                  </S.InputBox>
                </S.RatingSection>
                <S.CommentSection>
                  <S.Label htmlFor="수업집중도">
                    <span>수업평</span>
                  </S.Label>

                  <S.Input value={el.comments} readOnly />
                </S.CommentSection>
              </S.MainSection>
              <S.Footer>
                {idx + 1}/{studentResult.data.length}
              </S.Footer>
            </div>
          ))}
      </S.StyledSlider>
    </ReactModal>
  );
}
const S = {
  Title: styled.h1`
    ${tw`font-cafe24 text-3xl text-center mt-2`}
  `,
  Footer: styled.div`
    ${tw`font-cafe24 text-2xl text-center pt-5`}
  `,
  MainSection: styled.div`
    ${tw`grid grid-cols-2`}
  `,
  RatingSection: styled.div`
    ${tw`col-span-1 flex flex-col justify-center items-center`}
  `,
  CommentSection: styled.div`
    ${tw`col-span-1 flex flex-col justify-center items-center font-bold`}
  `,
  Rater: styled(Rater)`
    ${tw`flex text-5xl justify-center`}
  `,
  InputBox: styled.div`
    ${tw`m-5 w-[300px] text-center`}
  `,
  Label: styled.label`
    ${tw`font-cafe24 text-black rounded-lg w-[150px] text-xl text-center`}
    span {
      ${tw`text-brand font-bold text-2xl`}
    }
  `,
  Input: styled.textarea`
    ${tw`h-72 rounded-xl w-72 mt-3 focus:outline-brand border-2 border-black p-3 hover:cursor-default`}
  `,
  StyledSlider: styled(Slider)`
    .slick-prev::before,
    .slick-next::before {
      opacity: 0;
      display: none;
    }
  `,
  Next: styled.div`
    ${tw`w-20 h-20 text-black`}
  `,
  Prev: styled.div`
    ${tw`w-20 h-20 text-black`}
  `,
};
