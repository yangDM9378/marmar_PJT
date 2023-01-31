/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactSpeechRecognition from './ReactSpeechRecognition';

export default function ClockGame({ num, clockSpeakingQuestion, imagePath }) {
  const handleStop = transcript => {
    console.log(imagePath);
    if (transcript === imagePath) {
      console.log('정답입니다!!!!');
    }
  };
  return (
    <div>
      ClockGame {num} {imagePath}
      <ReactSpeechRecognition onStop={handleStop} />
    </div>
  );
}
