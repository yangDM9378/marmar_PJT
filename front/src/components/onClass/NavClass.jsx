/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { getQuestionApi } from '../../api/programApi';
import { OnClassContext } from '../../context/OnClassContext';

export default function NavClass() {
  const { request, setRequest, setResponse } = useContext(OnClassContext);

  // 프로그램
  const programOption = ['단어 읽기', '시계 읽기'];
  const programParam = ['word', 'clock'];
  const defaultProgram = '프로그램';
  const onSelectProgram = e => {
    const idx = programOption.indexOf(e.value);
    const program = programParam[idx];
    setRequest(prev => ({ ...prev, program }));
  };
  // 난이도
  const difficultyOption = ['상', '중', '하'];
  const difficultyParam = ['high', 'middle', 'low'];
  const defaultDifficulty = '난이도';
  const onSelectDifficulty = e => {
    const idx = difficultyOption.indexOf(e.value);
    const difficulty = difficultyParam[idx];
    setRequest(prev => ({ ...prev, difficulty }));
  };
  // 문제 개수
  const countOption = [1, 2, 3, 4, 5];
  const defaultCount = '문제 개수';
  const onSelectCount = e => {
    setRequest(prev => ({ ...prev, count: e.value }));
  };
  // 문제 불러오기
  const getQuestion = async () => {
    console.log(request);
    // const response = await getQuestionApi(request);
    // setResponse(response.data);
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
      <Dropdown
        options={countOption}
        onChange={onSelectCount}
        value={defaultCount}
        placeholder="Select an option"
      />
      <button type="submit" onClick={getQuestion}>
        시작
      </button>
    </div>
  );
}
