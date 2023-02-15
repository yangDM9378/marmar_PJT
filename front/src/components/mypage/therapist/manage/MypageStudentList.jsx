import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getRegisteredStudentApi } from '../../../../api/mypageApi';
import MypageSelectStudentModal from './MypageSelectStudentModal';
import MyPageStudentListItem from './MyPageStudentListItem';

// import MyPageStudentListItem from './MyPageStudentListItem';

export default function MypageStudentList() {
  const [isOpen, setOpen] = useState(false);
  // const { student } = props;
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
    onSuccess: () => {
      // console.log(students);
    },
    onError: () => {
      // console.log('QWDWQ');
    },
  });
  return (
    <S.RegisteredStudentsBox>
      <p className="font-cafe24 text-[40px]">치료중인 학생 목록</p>
      <div className="flex justify-end">
        <S.SearchButton type="button" onClick={handleModal}>
          학생 등록하기
        </S.SearchButton>
      </div>
      <MypageSelectStudentModal isOpen={isOpen} close={handleModal} />
      <S.StudentBox>
        <S.NameBox>이름 (아이디)</S.NameBox>
        <S.DelBox>관리</S.DelBox>
      </S.StudentBox>
      {students &&
        students.data.map(student => (
          <MyPageStudentListItem student={student} key={student.num} />
        ))}
    </S.RegisteredStudentsBox>
  );
}
// </tbody>MyPageStudentListItem key={student.num} student={student} />
const S = {
  RegisteredStudentsBox: styled.div`
    ${tw`h-fit w-full pb-20 pt-5  m-5 justify-center text-center`}
  `,
  // min-w-[160px] block
  SearchButton: styled.button`
    ${tw`p-3 rounded-xl mr-5 text-[18px] bg-brandHover text-white min-w-[160px]`}
  `,
  StudentBox: styled.div`
    ${tw`border-black grid grid-cols-6 bg-slate-300 m-5 p-5 rounded`}
  `,
  NameBox: styled.div`
    ${tw`col-span-3 text-2xl font-cafe24`}
  `,
  DelBox: styled.div`
    ${tw`col-span-3 text-2xl font-cafe24`}
  `,
  // RegisteredStudentsBox: styled.table.th`
  //   ${tw`border: 1px`}
  // `,
};
