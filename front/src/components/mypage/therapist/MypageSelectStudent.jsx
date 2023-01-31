import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import styled from 'styled-components';
import tw from 'twin.macro';
import { getRegisteredStudentApi } from '../../../api/mypageApi';
import MypageSelectStudentModal from './MypageSelectStudentModal';
// import MypageStudentList from './MypageStudentList';

export default function MypageSelectStudent() {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!isOpen);
  };
  const {
    // isLoading,
    // error,
    data: students,
  } = useQuery({
    queryKey: ['registerdStudents'],
    queryFn: () => getRegisteredStudentApi(),
    staleTime: 6 * 10 * 1000,
    cacheTime: 6 * 10 * 1000,
    onSuccess: () => {
      console.log(students);
    },
    onError: () => {
      console.log('QWDWQ');
    },
  });
  return (
    <S.SelectBox>
      <S.SearchButton type="button" onClick={handleModal}>
        학생 등록하기
      </S.SearchButton>
      <MypageSelectStudentModal isOpen={isOpen} close={handleModal} />
      {/* {students &&
        students.data.length > 0 &&
        students.data.map(student => <MypageStudentList student={student} />)} */}
    </S.SelectBox>
  );
}

const S = {
  SelectBox: styled.div`
    ${tw`h-32 flex justify-center items-center`}
  `,
  SearchButton: styled.button`
    ${tw`border-2 border-black p-3`}
  `,
};
