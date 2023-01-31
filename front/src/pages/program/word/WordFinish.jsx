import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WordFinish() {
  const navigater = useNavigate();
  const goWordDifficulty = () => {
    navigater('/WordDifficulty');
  };
  return (
    <div>
      끝났다.
      <button type="button" onClick={goWordDifficulty}>
        처음으로
      </button>
    </div>
  );
}
