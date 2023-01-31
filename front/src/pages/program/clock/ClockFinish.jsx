import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClockFinish() {
  const navigater = useNavigate();
  const goClockDifficulty = () => {
    navigater('/ClockDifficulty');
  };
  return (
    <div>
      끝났다.
      <button type="button" onClick={goClockDifficulty}>
        처음으로
      </button>
    </div>
  );
}
