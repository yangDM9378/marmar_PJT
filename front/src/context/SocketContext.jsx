/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();
export const socket = io.connect('http://localhost:4000');
export default function SocketProvider({ children }) {
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

  return (
    <SocketContext.Provider value={{ socket, onAny, onConnect, test }}>
      {children}
    </SocketContext.Provider>
  );
}
