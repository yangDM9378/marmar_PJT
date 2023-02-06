/* eslint-disable no-const-assign */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Game from './Game';

export default function ClassSection(props) {
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
        }}
      >
        종료
      </button>
      <Game sessionId={sessionId} />
    </div>
  );
}
