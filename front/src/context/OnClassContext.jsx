/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext } from 'react';

export const OnClassContext = createContext();

export default function OnClassProvider({ children }) {
  const [request, setRequest] = useState({
    program: '',
    difficulty: '',
    count: 0,
  });

  const [response, setResponse] = useState('');

  return (
    <OnClassContext.Provider
      value={{ request, setRequest, response, setResponse }}
    >
      {children}
    </OnClassContext.Provider>
  );
}
