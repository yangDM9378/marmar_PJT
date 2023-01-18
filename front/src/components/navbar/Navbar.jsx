import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import DevDropDown from './DevDropDown';

export default function Navbar() {
  return (
    <S.NavHeader>
      <S.LogoLink to="/">
        <h1>마르마르</h1>
      </S.LogoLink>
      <DevDropDown />
      <div>ㅇㅇㅇㅇ</div>
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
