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
import empty from '../audio/empty.mp3';

export const SttContext = createContext();

export default function SttProvider({ children }) {
  // 효과음
  const [playCorrect, { stopCorrect }] = useSound(correct);
  const [playWrong, { stopWrong }] = useSound(wrong);
  const [playNext, { stopNext }] = useSound(next);
  const [playEmpty, { stopEmpty }] = useSound(empty);

  const soundCorrect = () => {
    playCorrect();
  };
  const soundWrong = () => {
    playWrong();
  };
  const soundEmpty = () => {
    playEmpty();
  };
  const soundNext = () => {
    playNext();
  };
  // 모달관련
  const [modalCorrect, setModalCorrect] = useState(false);
  const [modalWrong, setModalWrong] = useState(false);
  const [modalNo, setModalNo] = useState(false);
  // 녹음 관련
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [start, setStart] = useState(false);
  const speechStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ko',
    });
    setStart(true);
  };
  const speechStop = () => {
    SpeechRecognition.abortListening({
      continuous: false,
    });
    setStart(false);
    console.log(question, transcript);
    if (transcript === question) {
      playCorrect();
      setModalCorrect(true);
    } else {
      setModalWrong(true);
      playWrong();
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
        modalCorrect,
        setModalCorrect,
        modalWrong,
        setModalWrong,
        modalNo,
        setModalNo,
        soundCorrect,
        soundWrong,
        soundEmpty,
        soundNext,
      }}
    >
      {children}
    </SttContext.Provider>
  );
}
