import React from 'react';
import NavClass from '../../components/onClass/NavClass';
import ProgramClass from '../../components/onClass/ProgramClass';
import OnClassProvider from '../../context/OnClassContext';

export default function Program() {
  return (
    <div>
      <OnClassProvider>
        <NavClass />
        <ProgramClass />
      </OnClassProvider>
    </div>
  );
}
