/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import ReactSpeechRecognition from '../../../components/program/ReactSpeechRecognition';
import { getClockApi } from '../../../api/programApi';
import ClockGame from '../../../components/program/ClcokGame';

export default function ClockProgram() {
  const location = useLocation();
  const difficulty = location.state?.difficulty;
  const [clockData, setClockData] = useState([]);
  const [cnt, setCnt] = useState(0);

  const getClockData = async () => {
    console.log(difficulty);
    const response = await getClockApi(difficulty);
    console.log(response.data);
    setClockData(response.data);
  };

  useEffect(() => {
    getClockData();
  }, [difficulty]);

  const navigate = useNavigate();
  const cntPlus = () => {
    cnt < 10 && setCnt(cnt + 1);
    cnt >= 10 && navigate('/ClockFinish');
  };

  return (
    <div>
      <h1>시계 읽기</h1>
      {difficulty}
      {cnt}

      <ClockGame {...clockData[cnt]} />
      {/* <ReactSpeechRecognition /> */}

      <button type="button" onClick={cntPlus}>
        button
      </button>
    </div>
  );
}
