/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../context/SocketContext';
import Program from '../../pages/onClass/Program';

export default function Game(props) {
  const { sessionId } = props;

  const { joinRoom } = useContext(SocketContext);

  useEffect(() => {
    joinRoom(sessionId);
  }, []);

  return (
    <div>
      <Program />
    </div>
  );
}
