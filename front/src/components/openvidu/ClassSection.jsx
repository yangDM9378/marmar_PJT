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
        onClick={() => {
          close();
          closeNavigate();
        }}
      >
        종료
      </button>
      <Game sessionId={sessionId} />
    </div>
  );
}
