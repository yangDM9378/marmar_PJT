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
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        <img src="./main/footer-1.png" alt="" className="w-full" />

        <img src="./main/footer-2.png" alt="" className="w-full" />
      </Slider>
    </div>
  );
}
