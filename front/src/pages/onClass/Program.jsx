import React from 'react';
import ClockClass from '../../components/onClass/ClockClass';
import NavClass from '../../components/onClass/NavClass';
import WordClass from '../../components/onClass/WordClass';

export default function Program() {
  return (
    <div>
      <NavClass />
      <WordClass />
      <ClockClass />
    </div>
  );
}
