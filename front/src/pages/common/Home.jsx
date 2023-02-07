import React from 'react';
import HomeBody from '../../components/home/HomeBody';
import HomeHeader from '../../components/home/HomeHeader';

export default function Home() {
  return (
    <div className="mt-12">
      <HomeHeader />
      <HomeBody />
    </div>
  );
}
