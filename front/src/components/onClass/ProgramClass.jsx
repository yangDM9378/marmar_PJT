/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import WordClass from './WordClass';
import ClockClass from './ClockClass';
import { OnClassContext } from '../../context/OnClassContext';

export default function ProgramClass() {
  const { request } = useContext(OnClassContext);

  return (
    <div>
      {request.game === 'word' && <WordClass />}
      {request.game === 'clock' && <ClockClass />}
    </div>
  );
}
