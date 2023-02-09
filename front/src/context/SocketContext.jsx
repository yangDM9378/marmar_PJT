/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { io } from 'socket.io-client';
import { getQuestionApi } from '../api/programApi';

export const SocketContext = createContext();
export const socket = io.connect('https://i8c204.p.ssafy.io/node'); //  http://localhost:4000/
export default function SocketProvider({ children }) {
  const [roomName, setRoomName] = useState('');

  const test = () => {
    console.log('qwd');
  };
  const onAny = () => {
    socket.onAny(event => {
      console.log(`Socket event: ${event}`);
    });
  };
  const onConnect = () => {
    console.log('현재');
    socket.emit('connecting');
  };
  // 방 입장
  const joinRoom = sessionId => {
    console.log(socket.data);
    socket.emit('joinRoom', { roomName: sessionId });
  };
  const getRoom = () => {
    socket.on('joinRoom', name => {
      setRoomName(name);
    });
  };
  // 방 나가기
  const leaveRoom = () => {
    socket.emit('leaveRoom');
  };

  // 문제 시작 버튼
  const clickStartButton = async payload => {
    const res = await getQuestionApi(payload);
    const result = await { question: res.data, payload };
    await socket.emit('startButton', result);
  };

  // 이전, 다음, 처음으로
  const clickPrevButton = num => {
    socket.emit('prevButton', num);
  };
  const clickNextButton = num => {
    socket.emit('nextButton', num);
  };
  const clickEndButton = payload => {
    socket.emit('endButton', payload);
  };

  // 픽쳐게임 문제 선택
  const pictureClickAnswer = data => {
    socket.emit('pictureClickAnswer', data);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onAny,
        onConnect,
        test,
        joinRoom,
        getRoom,
        leaveRoom,
        roomName,
        clickStartButton,
        clickPrevButton,
        clickNextButton,
        clickEndButton,
        pictureClickAnswer,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
