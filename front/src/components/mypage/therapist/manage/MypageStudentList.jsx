import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getRegisteredStudentApi } from '../../../../api/mypageApi';
import MyPageStudentListItem from './MyPageStudentListItem';

export default function MypageStudentList() {
  const {
    // isLoading,
    // error,
    data: students,
  } = useQuery({
    queryKey: ['registerdStudents'],
    queryFn: () => getRegisteredStudentApi(),
    onSuccess: () => {
      console.log(students);
    },
    onError: () => {
      console.log('QWDWQ');
    },
  });
  return (
    <S.RegisteredStudentsBox>
      <p className="text-center">등록된 학생 리스트</p>
      {students &&
        students.data.map(student => (
          <MyPageStudentListItem key={student.num} student={student} />
        ))}
    </S.RegisteredStudentsBox>
  );
}

const S = {
  RegisteredStudentsBox: styled.div`
    ${tw`h-fit py-20 px-10 border-4 border-black m-5`}
  `,
};
