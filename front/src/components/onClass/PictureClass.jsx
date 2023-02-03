/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useState } from 'react';

// let initial = [false, false, false, false];

export default function PictureClass() {
  const [isCheckArr, setIsCheckArr] = useState([false, false, false, false]);

  const check = e => {
    const updateArr = isCheckArr?.map((item, idx) => {
      if (idx === Number(e.target.value)) {
        console.log(123);
        console.log(true);
        return !item;
      } else {
        return false;
      }
    });
    setIsCheckArr(updateArr);
  };
  const correctCheck = () => {
    console.log(isCheckArr);
    if (isCheckArr.toString() === [false, false, false, false].toString()) {
      return alert('답을 눌러주세요');
    } else if (isCheckArr[0] === true) {
      return alert('정답임');
    } else {
      return alert('정답아님');
    }
  };

  return (
    <div>
      <button type="button" value="0" onClick={check}>
        pic1
      </button>
      {isCheckArr[0] && (
        <button type="button" value="0" onClick={check}>
          false
        </button>
      )}

      <button type="button" value="1" onClick={check}>
        pic2
      </button>
      {isCheckArr[1] && (
        <button type="button" value="1" onClick={check}>
          false
        </button>
      )}

      <button type="button" value="2" onClick={check}>
        pic3
      </button>
      {isCheckArr[2] && (
        <button type="button" value="2" onClick={check}>
          false
        </button>
      )}

      <button type="button" value="3" onClick={check}>
        pic4
      </button>

      {isCheckArr[3] && (
        <button type="button" value="3" onClick={check}>
          false
        </button>
      )}

      <button type="button" onClick={correctCheck}>
        정답확인
      </button>
    </div>
  );
}
