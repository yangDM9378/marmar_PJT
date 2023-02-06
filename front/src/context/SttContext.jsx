/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import useSound from 'use-sound';
import correct from '../audio/correct.mp3';
import wrong from '../audio/wrong.mp3';
import next from '../audio/next.mp3';

export const SttContext = createContext();

export default function SttProvider({ children }) {
  // 효과음
  const [playCorrect, { stopCorrect }] = useSound(correct);
  const [playWrong, { stopWrong }] = useSound(wrong);
  const [playNext, { stopNext }] = useSound(next);

  // 녹음 관련
  const { transcript } = useSpeechRecognition();
  const [start, setStart] = useState(false);
  const speechStart = () => {
    setStart(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ko',
    });
  };
  const speechStop = () => {
    setStart(false);
    SpeechRecognition.abortListening({
      continuous: false,
    });
    console.log(question, transcript);
    if (transcript === question) {
      playCorrect();
      alert('잘 발음 했다');
    } else {
      playWrong();
      alert('다시 발음해주세요');
    }
  };
  const stopForNext = () => {
    setStart(false);
    playNext();
    SpeechRecognition.abortListening({
      continuous: false,
    });
  };

  // 정답 관련
  const [question, setQuestion] = useState('');
  const getQuestion = value => {
    setQuestion(value);
  };
  // picturegame
  const [isCheckArr, setIsCheckArr] = useState([false, false, false, false]);

  return (
    <SttContext.Provider
      value={{
        speechStart,
        speechStop,
        transcript,
        question,
        getQuestion,
        stopForNext,
        isCheckArr,
        setIsCheckArr,
        start,
        setStart,
      }}
    >
      {children}
    </SttContext.Provider>
  );
}
