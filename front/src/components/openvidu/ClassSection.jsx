/* eslint-disable no-const-assign */
/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import Game from './Game';

export default function ClassSection(props) {
  const { leaveRoom } = useContext(SocketContext);
  const navigate = useNavigate();
  const { close, sessionId } = props;
  const closeNavigate = () => {
    navigate('/');
  };
  return (
    <div>
      <button
        type="button"
        className="border-2 m-3 p-3"
        onClick={async () => {
          await close();
          await closeNavigate();
          await leaveRoom();
        }}
      >
        종료
      </button>
      <Game sessionId={sessionId} />
    </div>
  );
}
