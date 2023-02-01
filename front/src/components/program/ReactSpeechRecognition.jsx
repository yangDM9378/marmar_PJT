import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export default function ReactSpeechRecognition() {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const speechStart = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ko',
    });

  const speechStop = () => {
    console.log(transcript);
    SpeechRecognition.abortListening({
      continuous: false,
    });
    console.log(transcript);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>speaking</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button type="button" onClick={speechStart}>
        Start
      </button>
      <button type="button" onClick={speechStop}>
        Stop
      </button>
      <p>{transcript}</p>
    </div>
  );
}
