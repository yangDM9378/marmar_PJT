import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import MakeRoomModal from '../openvidu/makeroom/MakeRoomModal';
import ClassDropDown from './ClassDropDown';
import MyDropDown from './MyDropDown';

export default function NavTherapist() {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!isOpen);
  };
  return (
    <S.Box>
      <Link to="/Info">마르마르소개</Link>
      <ClassDropDown />
      <S.Class type="button" onClick={handleModal} className="bg-slate-200">
        방생성
      </S.Class>
      <MyDropDown />
      <MakeRoomModal isOpen={isOpen} close={handleModal} />
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    ${tw`flex justify-around items-center font-cafe24 text-2xl space-x-10`}
  `,
  Class: styled.button`
    ${tw`p-2 rounded-xl`}
  `,
};
