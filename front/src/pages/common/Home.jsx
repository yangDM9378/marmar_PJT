import React from 'react';
import HomeBody from '../../components/home/HomeBody';
import HomeHeader from '../../components/home/HomeHeader';
import HomeGame from '../../components/home/HomeGameBody';

export default function Home() {
  return (
    <div className="mt-12">
      <HomeHeader />
      <HomeBody />
      <HomeGame />
    </div>
  );
}
