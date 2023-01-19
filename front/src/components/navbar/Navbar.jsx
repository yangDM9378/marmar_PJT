// import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import useAuth from '../../hooks/queries/useAuth';
import DevDropDown from './DevDropDown';

export default function Navbar() {
  const { useUserCheck, useLogOut } = useAuth();
  const { data: user } = useUserCheck();
  return (
    <S.NavHeader>
      <S.LogoLink to="/">
        <h1>마르마르</h1>
      </S.LogoLink>
      <DevDropDown />
      {!user && <div>로그인 안 함</div>}
      {user && (
        <div>
          <button type="button" onClick={useLogOut}>
            로그아웃
          </button>
          <div>{user.name}</div>
        </div>
      )}
    </S.NavHeader>
  );
}
const S = {
  NavHeader: styled.header`
    ${tw`flex justify-between border-b border-gray-300 p-2`}
  `,
  LogoLink: styled(Link)`
    ${tw`flex items-center text-4xl text-brand`}
  `,
};
