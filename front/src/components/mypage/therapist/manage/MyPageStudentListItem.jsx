import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import tw from 'twin.macro';
import { delRegisteredStudentApi } from '../../../../api/mypageApi';
import StudentResultModal from './StudentResultModal';

export default function MyPageStudentListItem(props) {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!isOpen);
  };

  const queryClient = useQueryClient();
  const { student } = props;

  const onDeleteRegister = async () => {
    await delRegisteredStudentApi(student.num);
    await queryClient.invalidateQueries({ queryKey: ['registerdStudents'] });
    await Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${student.studentId}님이 등록 해제되었습니다.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <S.StudentBox>
      <S.NameBox>
        {student.studentName} ({student.studentId})
      </S.NameBox>
      <S.DelBox>
        <S.DeleteButton
          className="text-brand hover:border-brand"
          onClick={handleModal}
        >
          수업 내역
        </S.DeleteButton>
        <S.DeleteButton
          className="text-red-400 hover:border-red-400"
          onClick={onDeleteRegister}
        >
          등록 해제
        </S.DeleteButton>
      </S.DelBox>
      <StudentResultModal
        isOpen={isOpen}
        close={handleModal}
        num={student.num}
        name={student.studentName}
      />
    </S.StudentBox>
  );
}
// ${tw`p-5 m-5 text-xl flex justify-between border-4 border-black`}
const S = {
  StudentBox: styled.div`
    ${tw`grid grid-cols-2 m-5 border-b-2 border-slate-300 pb-4 min-w-[600px]`}
  `,
  NameBox: styled.div`
    ${tw`col-span-1 flex items-center justify-center font-cafe24 text-2xl`}
  `,
  DelBox: styled.div`
    ${tw`col-span-1 grid grid-cols-2`}
  `,
  DeleteButton: styled.button`
    ${tw`text-2xl font-cafe24 border-2 rounded-3xl w-[80%] mx-auto p-3`}
  `,
};
