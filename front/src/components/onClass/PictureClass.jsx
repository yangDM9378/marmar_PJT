/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
import React, { useState } from 'react';

let initial = [false, false, false, false];

export default function PictureClass() {
  const data = {
    num: 1,
    picture_one: '사진1',
    picture_two: '사진2',
    picture_three: '사진3',
    picture_four: '사진4',
    answer: 3,
  };
  const { isCheckArr, setIsCheckArr } = useState(initial);

  const check = async e => {
    console.log(isCheckArr);
    console.log(e.target.value);
    const updateArr = isCheckArr?.map((item, idx) => {
      console.log(item);
      if (idx === e.target.value) {
        return !item;
      } else {
        return item;
      }
    });
    setIsCheckArr(updateArr);
  };
  return (
    <div>
      <button type="button" value="1" onClick={check}>
        {data.picture_one}
      </button>

      <button type="submit" value="2" onClick={check}>
        {data.picture_two}
      </button>
      <button type="submit" value="3" onClick={check}>
        {data.picture_three}
      </button>
      <button type="submit" value="4" onClick={check}>
        {data.picture_four}
      </button>
      {/* <button type="button" onClick={correctCheck}>
        정답확인
      </button> */}
    </div>
  );
}
