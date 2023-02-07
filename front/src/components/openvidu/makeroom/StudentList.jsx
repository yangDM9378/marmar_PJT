import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function StudentList(props) {
  const { student, setStudent } = props;
  return (
    <S.StudentBox>
      <div>
        <p>
          이름 : {student.studentName} ||| 아이디 : {student.studentId}
        </p>
        <button type="button" onClick={() => setStudent(student.num)}>
          클릭
        </button>
      </div>
    </S.StudentBox>
  );
}

const S = {
  StudentBox: styled.div`
    ${tw`p-2 m-2 text-xl flex justify-between border-4 border-black`}
  `,
};
