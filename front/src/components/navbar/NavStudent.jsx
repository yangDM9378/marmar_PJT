import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import ClassDropDown from './ClassDropDown';
import MyDropDown from './MyDropDown';
import useAuth from '../../hooks/queries/useAuth';

export default function NavStudent() {
  const [temp, setTemp] = useState(false);
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  return (
    <S.Box>
      <Link to="/">마르마르 소개</Link>
      <ClassDropDown />
      <S.Class
        type="button"
        className={`${student.ongoing ? 'bg-yellow-300' : 'bg-slate-300'}`}
      >
        방입장
      </S.Class>
      <MyDropDown />
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    ${tw`flex justify-around items-center font-cafe24 space-x-6`}
  `,
  Class: styled.button`
    ${tw`p-2 rounded-xl`}
  `,
};
