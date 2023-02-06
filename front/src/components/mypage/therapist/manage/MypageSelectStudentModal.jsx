import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import tw from 'twin.macro';
import { AiOutlineSearch } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import SearchList from './SearchList';
import { searchStudentApi } from '../../../../api/mypageApi';

export default function MypageSelectStudentModal({ isOpen, close }) {
  const [search, setSearch] = useState('');

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
      className="h-fit w-[700px] bg-slate-400 rounded-xl m-auto mt-20 p-20"
    >
      <S.ModalHeader>
        <div>학생 선택하기</div>
        <S.ModalButton type="button" onClick={close}>
          close
        </S.ModalButton>
      </S.ModalHeader>
      <S.ModalSeachDiv>
        <AiOutlineSearch
          className="absolute right-1 top-3"
          onClick={onSearch}
        />
        <S.ModalSeachInput type="text" onChange={onInput} />
        {students &&
          students.data.length > 0 &&
          students.data.map(student => <SearchList student={student} />)}
      </S.ModalSeachDiv>
    </ReactModal>
  );
}

const S = {
  ModalHeader: styled.div`
    ${tw`flex justify-between items-center border-4`}
  `,
  ModalButton: styled.button`
    ${tw`border-2 border-black p-3`}
  `,
  ModalSeachDiv: styled.div`
    ${tw`relative border-4`}
  `,
  ModalSeachInput: styled.input`
    ${tw`border-b-2 border-black w-full focus:outline-0 h-10`}
  `,
};
