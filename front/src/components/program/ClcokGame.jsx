/* eslint-disable react/destructuring-assignment */
import React from 'react';

export default function ClockGame({ num, clockSpeakingQuestion, imagePath }) {
  return (
    <div>
      ClockGame {num} {clockSpeakingQuestion} {imagePath}
    </div>
  );
}
