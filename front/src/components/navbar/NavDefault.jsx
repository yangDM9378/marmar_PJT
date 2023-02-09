import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import ClassDropDown from './ClassDropDown';

export default function NavDefault() {
  return (
    <S.Box>
      <Link to="/Info">마르마르 소개</Link>
      <ClassDropDown />
      <Link to="/SignIn">로그인</Link>
      <Link to="/SignUp">회원가입</Link>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    ${tw`flex justify-around items-center font-cafe24 space-x-6`}
  `,
};
