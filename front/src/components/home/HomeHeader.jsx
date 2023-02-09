/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeHeader() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <S.Header>
      <Slider {...settings}>
        <div>
          <div className="bg-main-bg-1 bg-cover bg-no-repeat w-[100vw] h-[92vh]" />
        </div>
        <div>
          <div className="bg-main-bg-2 bg-cover bg-no-repeat w-[100vw] h-[92vh]" />
        </div>
        <div>
          <div className="bg-main-bg-3 bg-cover bg-no-repeat w-[100vw] h-[92vh]" />
        </div>
      </Slider>
    </S.Header>
  );
}

const S = {
  Header: styled.div`
    ${tw`mt-[8vh] w-[100%] h-[92%]`}
  `,
};
