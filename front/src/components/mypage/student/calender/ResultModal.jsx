/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import tw from 'twin.macro';
import Rater from 'react-rater';
import Slider from 'react-slick';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function ResultModal({ isOpen, close, date, num, calender }) {
  const orderedDate = calender?.data.sort(
    (a, b) => new Date(a.evalDate) - new Date(b.evalDate),
  );
  let today = 0;
  orderedDate?.forEach((el, idx) => {
    if (el.evalDate === date) {
      today = idx;
    }
  });
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: today,
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
      <S.StyledSlider {...settings}>
        {orderedDate &&
          orderedDate.map((el, idx) => (
            <div>
              <S.Title>{el.evalDate} 수업일지</S.Title>
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
                {idx + 1}/{orderedDate.length}
              </S.Footer>
            </div>
          ))}
      </S.StyledSlider>
    </ReactModal>
  );
}

const S = {
  Title: styled.h1`
    ${tw`font-cafe24 m-5 text-3xl text-center`}
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
