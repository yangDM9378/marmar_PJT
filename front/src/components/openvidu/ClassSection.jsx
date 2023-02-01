/* eslint-disable no-const-assign */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Game from './Game';

export default function ClassSection(props) {
  const { close, sessionId } = props;
  return (
    <div>
      <button type="button" onClick={close}>
        종료
      </button>
      <Game sessionId={sessionId} />
    </div>
  );
}
