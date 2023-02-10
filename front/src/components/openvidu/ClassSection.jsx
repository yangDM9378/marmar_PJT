/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import Program from '../../pages/onClass/Program';
// import Game from './Game';

export default function ClassSection(props) {
  const { sessionId } = props;
  const { joinRoom, getRoom } = useContext(SocketContext);

  useEffect(() => {
    joinRoom(sessionId);
    getRoom();
  }, []);

  return (
    <div className="h-full">
      <Program />
    </div>
  );
}
