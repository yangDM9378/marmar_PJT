/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import WordClass from './WordClass';
import ClockClass from './ClockClass';
import { OnClassContext } from '../../context/OnClassContext';
import PictureClass from './PictureClass';

export default function ProgramClass() {
  const { request } = useContext(OnClassContext);

  return (
    <div>
      {request.game}
      {request.game === 'word' && <WordClass />}
      {request.game === 'clock' && <ClockClass />}
      {request.game === 'picture' && <PictureClass />}
    </div>
  );
}
