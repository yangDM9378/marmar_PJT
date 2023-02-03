/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useLocation } from 'react-router-dom';

export default function NavClass() {
  const [request, setRequest] = useState({ program: '', difficulty: '' });
  const [response, setResponse] = useState({ program: '', difficulty: '' });

  // 프로그램
  const programOption = ['단어 읽기', '시계 읽기'];
  const defaultProgram = '프로그램';
  const onSelectProgram = e => {
    setRequest(prev => ({ ...prev, program: e.value }));
  };
  // 난이도
  const difficultyOption = ['상', '중', '하'];
  const defaultDifficulty = '난이도';
  const onSelectDifficulty = e => {
    setRequest(prev => ({ ...prev, difficulty: e.value }));
  };
  // 문제 불러오기
  const getQuestion = () => {
    console.log(request);
    setResponse(response);
  };
  return (
    <div>
      <Dropdown
        options={programOption}
        onChange={onSelectProgram}
        value={defaultProgram}
        placeholder="Select an option"
      />
      <Dropdown
        options={difficultyOption}
        onChange={onSelectDifficulty}
        value={defaultDifficulty}
        placeholder="Select an option"
      />
      <button type="submit" onClick={getQuestion}>
        시작
      </button>
    </div>
  );
}
