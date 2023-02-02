/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
// import { useNavigate } from 'react-router-dom';

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
    if (transcript === question) {
      alert('잘 발음 했다');
    } else {
      alert('다시 발음해주세요');
    }
  };
  const stopForNext = () => {
    SpeechRecognition.abortListening({
      continuous: false,
    });
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
