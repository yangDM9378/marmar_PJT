/* eslint-disable react/destructuring-assignment */
import React from 'react';

export default function WordGame({ num, wordSpeakingQuestion, imagePath }) {
  return (
    <div>
      WordGame {num} {wordSpeakingQuestion} {imagePath}
    </div>
  );
}
