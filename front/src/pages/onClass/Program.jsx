/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect } from 'react';
import NavClass from '../../components/onClass/NavClass';
import ProgramClass from '../../components/onClass/ProgramClass';
import OnClassProvider from '../../context/OnClassContext';
import { SocketContext } from '../../context/SocketContext';

export default function Program() {
  const { onAny, test, onConnect } = useContext(SocketContext);
  onAny();
  useEffect(() => {
    test();
    onConnect();
  }, []);

  return (
    <div className="h-full max-h-full">
      <OnClassProvider>
        <NavClass />
        <ProgramClass />
      </OnClassProvider>
    </div>
  );
}
