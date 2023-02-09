import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import {
  getRegisteredStudentApi,
  delRegisteredStudentApi,
} from '../../../../api/mypageApi';
import MypageSelectStudentModal from './MypageSelectStudentModal';

// import MyPageStudentListItem from './MyPageStudentListItem';

export default function MypageStudentList() {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);
  // const { student } = props;
  const handleModal = () => {
    setOpen(!isOpen);
  };

  const onDeleteRegister = async data => {
    console.log('qwdwq');
    await delRegisteredStudentApi(data);
    await queryClient.invalidateQueries({ queryKey: ['registerdStudents'] });
  };

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
      <p className="font-cafe24 text-[40px]">등록된 학생 리스트</p>
      <S.SearchButton type="button" onClick={handleModal}>
        학생 등록하기
      </S.SearchButton>
      <MypageSelectStudentModal isOpen={isOpen} close={handleModal} />
      <S.Listtable className="items-center">
        <colgroup>
          <col width="17%" />
          <col width="30%" />
          <col width="40%" />
          <col width="13%" />
        </colgroup>
        <thead>
          <tr>
            <th>학생 고유 번호</th>
            <th>학생 이름</th>
            <th>학생 아이디</th>
            <th>버튼</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.data.map(student => (
              <tr key={student.num}>
                <td>{student.num}</td>
                <td>{student.studentName}</td>
                <td>{student.studentId}</td>
                <td>
                  <S.DeleteButton
                    onClick={e => {
                      onDeleteRegister(student.num, e);
                    }}
                  >
                    등록 해제
                  </S.DeleteButton>
                </td>
              </tr>
            ))}
        </tbody>
      </S.Listtable>
    </S.RegisteredStudentsBox>
  );
}
// </tbody>MyPageStudentListItem key={student.num} student={student} />
const S = {
  RegisteredStudentsBox: styled.div`
    ${tw`h-fit w-full pb-20 pt-5  m-5 justify-center text-center`}
  `,
  DeleteButton: styled.button`
    ${tw`p-5 `}
  `,
  Listtable: styled.table`
    ${tw`w-full text-[18px]`}

    tbody > tr,
    th,
    td {
      ${tw`border-2`}
    }
  `,
  // min-w-[160px] block
  SearchButton: styled.button`
    ${tw`p-3 rounded-xl float-right mr-5 mb-5 mt-5 text-[18px] bg-brandHover text-white min-w-[160px] block`}
  `,
  // RegisteredStudentsBox: styled.table.th`
  //   ${tw`border: 1px`}
  // `,
};
