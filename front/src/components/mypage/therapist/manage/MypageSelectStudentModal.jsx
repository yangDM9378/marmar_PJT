import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import tw from 'twin.macro';
import { AiOutlineSearch } from 'react-icons/ai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  searchStudentApi,
  registerStudentApi,
} from '../../../../api/mypageApi';

export default function MypageSelectStudentModal({ isOpen, close }) {
  const [search, setSearch] = useState('');

  const queryClient = useQueryClient();

  const onRegister = async data => {
    await registerStudentApi(data);
    await queryClient.invalidateQueries({ queryKey: ['students'] });
    await queryClient.invalidateQueries({ queryKey: ['registerdStudents'] });
  };

  const onInput = e => {
    setSearch(e.target.value);
  };
  const onSearch = () => {};
  const {
    // isLoading,
    // error,
    data: students,
  } = useQuery({
    queryKey: ['students', search],
    queryFn: () => searchStudentApi(search),
    enabled: !!search,
    onSuccess: () => {
      console.log(search);
      console.log(students);
    },
    onError: () => {
      console.log(search);
    },
  });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      className="h-fit w-[700px] bg-brandHover rounded-xl m-auto mt-20 p-20"
    >
      <p className="font-cafe24 text-[40px] text-white text-center">
        학생 검색
      </p>
      <br />
      <S.ModalSeachDiv>
        <AiOutlineSearch
          className="absolute right-1 top-3"
          onClick={onSearch}
        />
        <S.ModalSeachInput type="text" onChange={onInput} />

        {students &&
          students.data.length > 0 &&
          students.data.map(student => (
            <S.Listtable className="items-center text-center">
              <colgroup>
                <col width="17%" />
                <col width="30%" />
                <col width="40%" />
                <col width="13%" />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>이름</th>
                  <th>아이디</th>
                  <th>버튼</th>
                </tr>
              </thead>
              <tbody>
                <tr key={student.num}>
                  <td>{student.num}</td>
                  <td>{student.studentName}</td>
                  <td>{student.studentId}</td>
                  <td>
                    <S.AddButton
                      onClick={e => {
                        onRegister(student.num, e);
                      }}
                    >
                      등록
                    </S.AddButton>
                  </td>
                </tr>
              </tbody>
            </S.Listtable>
          ))}
      </S.ModalSeachDiv>
      {/* <p className="pl-4">등록할 학생을 검색하세요.</p> */}
      <S.ModalButton type="button" onClick={close}>
        close
      </S.ModalButton>
    </ReactModal>
  );
}

const S = {
  ModalButton: styled.button`
    ${tw`font-cafe24 rounded-xl text-[30px] bg-brandHover text-white m-auto block pl-10 pr-10 mt-20`}
  `,
  ModalSeachDiv: styled.div`
    ${tw`relative `}
  `,
  ModalSeachInput: styled.input`
    ${tw` w-full focus:outline-0 h-10`}
  `,
  Listtable: styled.table`
    ${tw`w-full text-[18px] bg-white`}
    thead > tr > th {
      ${`p-20`}
    }
    tbody > tr,
    th,
    td {
      ${tw`border-2 pt-2 pb-2`}
    }
  `,
  AddButton: styled.button`
    ${tw`pl-3 pr-3 `}
  `,
};
