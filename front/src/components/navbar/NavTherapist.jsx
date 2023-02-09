import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import ClassDropDown from './ClassDropDown';
import MyDropDown from './MyDropDown';

export default function NavTherapist() {
  const navigate = useNavigate();
  const onClass = () => {
    navigate('/OpenVidu');
  };
  return (
    <S.Box>
      <Link to="/Info">마르마르소개</Link>
      <ClassDropDown />
      <S.Class type="button" onClick={onClass} className="bg-slate-200">
        방생성
      </S.Class>
      <MyDropDown />
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
