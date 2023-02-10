import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link, useNavigate } from 'react-router-dom';
import ClassDropDown from './ClassDropDown';
import MyDropDown from './MyDropDown';
import useAuth from '../../hooks/queries/useAuth';

export default function NavStudent() {
  const navigate = useNavigate();
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const onEnterRoom = () => {
    navigate('/OpenVidu');
  };
  return (
    <S.Box>
      <Link to="/Info">마르마르 소개</Link>
      <ClassDropDown />
      <S.Class
        type="button"
        onClick={onEnterRoom}
        className={`${student.ongoing ? 'bg-yellow-300' : 'hidden'}`}
      >
        방입장
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
