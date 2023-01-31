import React from 'react';
import { registerStudentApi } from '../../../api/mypageApi';

export default function SearchList(props) {
  const { student } = props;
  const onRegister = () => {
    registerStudentApi(student.num);
  };
  return (
    <div className="border-4 p-3 flex justify-between">
      <p>{student.studentName}</p>
      <p>{student.studentId}</p>
      <button
        type="button"
        className="border-4 border-red-300 p-5"
        onClick={onRegister}
      >
        등록하기
      </button>
    </div>
  );
}
