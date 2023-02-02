import React from 'react';
import ClockClass from '../../components/onClass/ClockClass';
import NavClass from '../../components/onClass/NavClass';
import WordClass from '../../components/onClass/WordClass';
import OnClassProvider from '../../context/OnClassContext';

export default function Program() {
  return (
    <div>
      <OnClassProvider>
        <NavClass />
        <WordClass />
        <ClockClass />
      </OnClassProvider>
    </div>
  );
}
