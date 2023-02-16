import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import tw from 'twin.macro';
import { AiOutlineSearch } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { searchStudentApi } from '../../../../api/mypageApi';
import SearchList from './SearchList';

export default function MypageSelectStudentModal({ isOpen, close }) {
  const style = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };
  const [search, setSearch] = useState('');

  const onInput = e => {
    setSearch(e.target.value);
  };
  const {
    // isLoading,
    // error,
    data: students,
  } = useQuery({
    queryKey: ['students', search],
    queryFn: () => searchStudentApi(search),
    enabled: !!search,
    onSuccess: () => {},
    onError: () => {
      // console.log(search);
    },
  });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      style={style}
      className="h-fit w-[700px] bg-brandHover rounded-xl m-auto mt-[150px] p-20"
    >
      <p className="font-cafe24 text-[40px] text-white text-center">
        학생 등록
      </p>
      <p className="text-white font-cafe24 text-xl text-center">
        이름을 검색하고 클릭하면 등록할 수 있습니다.
      </p>
      <br />
      <S.ModalSeachDiv>
        <S.SeachDiv>
          <AiOutlineSearch className="text-2xl" />
          <S.ModalSeachInput
            type="text"
            onChange={onInput}
            placeholder="이름을 입력해주세요"
          />
        </S.SeachDiv>
        <S.ResultBox>
          {students &&
            students.data.length > 0 &&
            students.data.map(student => (
              <SearchList key={student.num} student={student} />
            ))}
        </S.ResultBox>
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
    ${tw`relative`}
  `,
  ModalSeachInput: styled.input`
    ${tw` w-full focus:outline-0 h-10 text-2xl`}
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
    ${tw`pl-3 pr-3`}
  `,
  SeachDiv: styled.div`
    ${tw`relative border-2 flex justify-center items-center px-3 mb-2 bg-white`}
  `,
  ResultBox: styled.div`
    ${tw`bg-slate-100 rounded max-h-[220px] overflow-y-scroll`}
  `,
};
