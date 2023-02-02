/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import Speech from 'speak-tts';

export default function TextToSpeech({ wordSpeakingQuestion }) {
  const [say, setSay] = useState('');

  const getSay = () => {
    setSay(wordSpeakingQuestion);
  };

  useEffect(() => {
    getSay(wordSpeakingQuestion);
  }, [wordSpeakingQuestion]);

  const speech = new Speech();
  speech.init({
    lang: 'ko-KR',
  });

  const handleClick = () => {
    speech.speak({
      text: say,
    });
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Speak
      </button>
    </div>
  );
}
