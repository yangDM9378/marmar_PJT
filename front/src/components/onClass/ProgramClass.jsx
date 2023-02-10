/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import WordClass from './WordClass';
import ClockClass from './ClockClass';
import { OnClassContext } from '../../context/OnClassContext';
import DefaultClass from './DefaultClass';
import PictureClass from './PictureClass';

export default function ProgramClass() {
  const { request } = useContext(OnClassContext);

  return (
    <div className="rounded h-full shadow-xl relative z-10">
      <div className="absolute z-50 h-full w-full p-8">
        {request.game === '' && <DefaultClass />}
        {request.game === 'word' && <WordClass />}
        {request.game === 'clock' && <ClockClass />}
        {request.game === 'picture' && <PictureClass />}
      </div>
      <div className="absolute z-0 h-full w-full">
        <img
          src="img/background/board3.png"
          alt=""
          className="h-full w-full z-0"
        />
      </div>
    </div>
  );
}
