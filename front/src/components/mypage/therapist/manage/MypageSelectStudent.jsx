import React, { useState } from 'react';

import styled from 'styled-components';
import tw from 'twin.macro';
import MypageSelectStudentModal from './MypageSelectStudentModal';

export default function MypageSelectStudent() {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!isOpen);
  };
  return (
    <div>
      <S.SelectBox>
        <S.SearchButton type="button" onClick={handleModal}>
          학생 등록하기
        </S.SearchButton>
        <MypageSelectStudentModal isOpen={isOpen} close={handleModal} />
      </S.SelectBox>
    </div>
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
