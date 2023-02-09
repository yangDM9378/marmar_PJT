import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { makeRoomApi } from '../../../api/liveClassApi';

export default function StudentList(props) {
  const { student, setStudent, join, getName } = props;
  const recent = JSON.parse(localStorage.getItem('recentClass'));
  const handleClick = async () => {
    if (recent) {
      await recent.forEach((el, idx) => {
        if (el.num === student.num) {
          recent.splice(idx, 1);
        }
      });
    }
    await setRecent();
    await makeRoomApi({ studentNum: student.num });
    await getName(student.studentName);
    await setStudent(student.num);
    await join();
  };
  const setRecent = () => {
    if (!recent) {
      const arr = [student];
      console.log(arr);
      localStorage.setItem('recentClass', JSON.stringify(arr));
    } else if (recent.length >= 6) {
      recent.pop();
      recent.unshift(student);
      const arr = recent;
      console.log(arr);
      localStorage.setItem('recentClass', JSON.stringify(arr));
    } else {
      recent.unshift(student);
      const arr = recent;
      console.log(arr);
      localStorage.setItem('recentClass', JSON.stringify(arr));
    }
  };
  return (
    <S.StudentBox onClick={handleClick}>
      <button type="button">
        {student.studentName}
        <span className="ml-2 text-slate-500">({student.studentId})</span>
      </button>
      {/* <button type="button" onClick={handleClick}>
        클릭
      </button> */}
    </S.StudentBox>
  );
}

const S = {
  StudentBox: styled.div`
    ${tw`mt-[1vw] flex justify-between px-3 py-1 hover:bg-slate-300 rounded hover:cursor-pointer`}
  `,
};
