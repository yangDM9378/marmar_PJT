import React from 'react';
import style from './StudentMypageStyle.module.css';

export default function StudentMypage() {
  return (
    <div className={`${style.container}`}>
      <div className={`${style.testsection} ${style.box1}`}>box1</div>
      <div className={`${style.testsection} ${style.box2}`}>box2</div>
      <div className={`${style.testsection} ${style.box3}`}>box3</div>
    </div>
  );
}
