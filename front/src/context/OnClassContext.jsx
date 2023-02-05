/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext } from 'react';

export const OnClassContext = createContext();

export default function OnClassProvider({ children }) {
  const [request, setRequest] = useState({
    game: '',
    difficulty: '',
    num: 0,
  });

  const [response, setResponse] = useState(['default']);

  // cnt
  const [cnt, setCnt] = useState(0);

  return (
    <OnClassContext.Provider
      value={{
        request,
        setRequest,
        response,
        setResponse,
        cnt,
        setCnt,
      }}
    >
      {children}
    </OnClassContext.Provider>
  );
}
