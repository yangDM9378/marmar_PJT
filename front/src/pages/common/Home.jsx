import React from 'react';
import HomeBody from '../../components/home/HomeBody';
import HomeHeader from '../../components/home/HomeHeader';
import HomeInfo from '../../components/home/HomeInfo';

export default function Home() {
  return (
    <div className="mt-12">
      <HomeHeader />
      <HomeBody />
      <HomeInfo />
    </div>
  );
}
