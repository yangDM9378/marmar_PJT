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

  // picturegame
  const [isCheckArr, setIsCheckArr] = useState([false, false, false, false]);

  return (
    <OnClassContext.Provider
      value={{
        request,
        setRequest,
        response,
        setResponse,
        isCheckArr,
        setIsCheckArr,
        cnt,
        setCnt,
      }}
    >
      {children}
    </OnClassContext.Provider>
  );
}
