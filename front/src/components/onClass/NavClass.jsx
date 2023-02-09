/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useContext, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { getQuestionApi } from '../../api/programApi';
import { OnClassContext } from '../../context/OnClassContext';
import { SttContext } from '../../context/SttContext';
import { SocketContext } from '../../context/SocketContext';
import useAuth from '../../hooks/queries/useAuth';

export default function NavClass() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();

  const { request, setRequest, setResponse, setCnt } =
    useContext(OnClassContext);
  const { socket, clickStartButton } = useContext(SocketContext);
  const { setIsCheckArr } = useContext(SttContext);
  const [makeRequest, setMakeRequest] = useState({
    game: '',
    difficulty: '',
    num: '',
  });
  // 프로그램
  const programOption = ['단어 읽기', '시계 읽기', '그림 선택'];
  const programParam = ['word', 'clock', 'picture'];
  const defaultProgram = '프로그램';
  const onSelectProgram = e => {
    const idx = programOption.indexOf(e.value);
    const program = programParam[idx];
    setMakeRequest(prev => ({ ...prev, game: program }));
  };
  // 난이도
  const difficultyOption = ['상', '중', '하'];
  const difficultyParam = ['high', 'middle', 'low'];
  const defaultDifficulty = '난이도';
  const onSelectDifficulty = e => {
    const idx = difficultyOption.indexOf(e.value);
    const difficulty = difficultyParam[idx];
    setMakeRequest(prev => ({ ...prev, difficulty }));
  };
  // 문제 개수
  const countOption = [1, 2, 3, 4, 5];
  const defaultCount = '문제 개수';
  const onSelectCount = e => {
    setMakeRequest(prev => ({ ...prev, num: e.value }));
  };
  // 문제 불러오기
  const getQuestion = async () => {
    await setRequest(makeRequest);
    const response = await getQuestionApi(makeRequest);
    await setResponse(response.data);
    await console.log(response.data);
    setIsCheckArr([false, false, false, false]);
    setCnt(0);

    clickStartButton(makeRequest);
  };

  socket.on('startButton', async res => {
    await setRequest(res.payload);
    await setResponse(res.question);
    await console.log(res.question);
    setIsCheckArr([false, false, false, false]);
    setCnt(0);
  });

  return (
    <S.Box className={`${student ? 'hidden' : ''}`}>
      <S.Setting>
        <S.Dropdown
          options={programOption}
          onChange={onSelectProgram}
          value={defaultProgram}
          placeholder="Select an option"
        />
        <S.Dropdown
          options={difficultyOption}
          onChange={onSelectDifficulty}
          value={defaultDifficulty}
          placeholder="Select an option"
        />
        <S.Dropdown
          options={countOption}
          onChange={onSelectCount}
          value={defaultCount}
          placeholder="Select an option"
        />
        <S.Button type="button" onClick={getQuestion}>
          시작
        </S.Button>
      </S.Setting>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    ${tw`absolute z-50 w-[600px] right-[4%] top-2`}
    p {
      ${tw`pl-3 font-bold`}
    }
  `,
  Setting: styled.section`
    ${tw`rounded flex`}
  `,
  Dropdown: styled(Dropdown)`
    ${tw`font-cafe24`}
    margin: 10px;
    flex: 1;
  `,
  Button: styled.button`
    ${tw`font-cafe24 bg-white px-3 h-[41px] mt-[11px] rounded hover:bg-slate-200`}/* color: black;
    font-size: 15px;
    border: 2px solid;
    border-radius: 0.6em;
    padding: 1.2em 1.2em;
    &:hover {
      box-shadow: 0 0 10px 0 yellow inset, 0 0 10px 4px white;
      transition: 1000ms;
      transform: translateY(-0px);
      background-color: yellow;
      color: #000000;
    } */
  `,
};
