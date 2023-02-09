/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HomeInfo() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {/* <div className="bg-main-ft-1 bg-cover bg-no-repeat w-[100vw] h-[60vh]" /> */}
        <img src="./main/footer-1.png" alt="" />
        <img src="./main/footer-2.png" alt="" />
      </Slider>
    </div>
  );
}
