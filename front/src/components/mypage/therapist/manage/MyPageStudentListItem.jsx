import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { delRegisteredStudentApi } from '../../../../api/mypageApi';

export default function MyPageStudentListItem(props) {
  const { student } = props;
  const onDeleteRegister = () => {
    delRegisteredStudentApi(student.num);
  };
  return (
    <S.StudentBox>
      <div>
        <p>이름 : {student.studentName}</p>
        <p>아이디 : {student.studentId}</p>
      </div>
      <S.DeleteButton onClick={onDeleteRegister}>등록 해제</S.DeleteButton>
    </S.StudentBox>
  );
}

const S = {
  StudentBox: styled.div`
    ${tw`p-5 m-5 text-xl flex justify-between border-4 border-black`}
  `,
  DeleteButton: styled.button`
    ${tw`p-3 border-2`}
  `,
};
