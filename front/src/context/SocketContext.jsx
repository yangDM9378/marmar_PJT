/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();
export const socket = io.connect('http://localhost:4000');
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
    socket.emit('connecting');
  };
  const joinRoom = sessionId => {
    socket.emit('joinRoom', { roomName: sessionId });
  };
  const getRoom = () => {
    socket.on('joinRoom', name => {
      setRoomName(name);
    });
  };

  const clickStartButton = payload => {
    socket.emit('startButton', payload);
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
        roomName,
        clickStartButton,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
