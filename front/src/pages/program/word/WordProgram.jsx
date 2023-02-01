/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactSpeechRecognition from '../../../components/program/ReactSpeechRecognition';
import { getWordApi } from '../../../api/programApi';
import WordGame from '../../../components/program/WordGame';

export default function WordProgram() {
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [wordData, setWordData] = useState([]);
  const [cnt, setCnt] = useState(0);

  const getWordData = async () => {
    console.log(difficulty);
    const response = await getWordApi(difficulty);
    console.log(response.data);
    setWordData(response.data);
  };

  useEffect(() => {
    getWordData();
  }, [difficulty]);

  const navigate = useNavigate();
  const cntPlus = () => {
    cnt < 10 && setCnt(cnt + 1);
    cnt >= 10 && navigate('/WordFinish');
  };

  // const data = [
  //   { title: 111, com: 222 },
  //   { title: 888, com: 999 },
  // ];

  return (
    <div>
      <h1>단어 읽기</h1>
      {difficulty}
      {cnt}
      <WordGame {...wordData[cnt]} />
      <ReactSpeechRecognition />
      <button type="button" onClick={cntPlus}>
        button
      </button>
    </div>
  );
}
