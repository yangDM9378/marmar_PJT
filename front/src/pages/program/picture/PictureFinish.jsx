import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PictureFinish() {
  const navigater = useNavigate();
  const goPictureDifficulty = () => {
    navigater('/PictureDifficulty');
  };
  return (
    <div>
      끝났다.
      <button type="button" onClick={goPictureDifficulty}>
        처음으로
      </button>
    </div>
  );
}
