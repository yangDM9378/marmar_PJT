import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { registerStudentApi } from '../../../../api/mypageApi';

export default function SearchList(props) {
  const queryClient = useQueryClient();
  const { student } = props;
  const onRegister = async () => {
    await registerStudentApi(student.num);
    await queryClient.invalidateQueries({ queryKey: ['students'] });
    await queryClient.invalidateQueries({ queryKey: ['registerdStudents'] });
  };
  return (
    <S.StudentBox onClick={onRegister}>
      <button type="button">
        {student.studentName}
        <span className="ml-2 text-slate-500">({student.studentId})</span>
      </button>
    </S.StudentBox>
  );
}

const S = {
  StudentBox: styled.div`
    ${tw`flex justify-between px-3 py-3 hover:bg-slate-300 rounded hover:cursor-pointer text-xl font-bold`}
  `,
};
