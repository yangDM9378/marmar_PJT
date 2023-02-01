/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';

export const SttContext = createContext();

export default function SttProvider({ children }) {
  // 녹음 관련
  const { transcript } = useSpeechRecognition();
  const speechStart = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ko',
    });
  };
  const speechStop = () => {
    SpeechRecognition.abortListening({
      continuous: false,
    });
    console.log(transcript);
    if (transcript !== question) {
      console.log('정답이라누');
    }
  };
  const stopForNext = () => {
    SpeechRecognition.abortListening({
      continuous: false,
    });
  };

  // 문제 넘기기 관련
  const navigate = useNavigate();
  const [cnt, setCnt] = useState(0);
  const cntPlus = game => {
    cnt < 10 && setCnt(cnt + 1);
    cnt >= 10 && navigate(`${game}Finish`);
    stopForNext();
  };
  const cntMinus = () => {
    cnt > 0 && setCnt(cnt - 1);
    stopForNext();
  };

  // 정답 관련
  const [question, setQuestion] = useState('');
  const getQuestion = value => {
    setQuestion(value);
  };

  return (
    <SttContext.Provider
      value={{
        speechStart,
        speechStop,
        cnt,
        cntPlus,
        cntMinus,
        transcript,
        question,
        getQuestion,
        stopForNext,
      }}
    >
      {children}
    </SttContext.Provider>
  );
}
