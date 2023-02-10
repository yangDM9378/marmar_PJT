// import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import useAuth from '../../hooks/queries/useAuth';
import DevDropDown from './DevDropDown';
import NavDefault from './NavDefault';
import NavStudent from './NavStudent';
import NavTherapist from './NavTherapist';

export default function Navbar() {
  const { useStudentCheck, useTherapistCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const { data: therapist } = useTherapistCheck();
  return (
    <S.NavHeader>
      <S.LogoLink to="/">
        <S.LogoName>marmar</S.LogoName>
      </S.LogoLink>
      <DevDropDown />
      {!student && !therapist && <NavDefault />}
      {student && <NavStudent />}
      {therapist && <NavTherapist />}
    </S.NavHeader>
  );
}
const S = {
  NavHeader: styled.header`
    ${tw`flex justify-between border-b border-gray-300 p-[2vh] fixed top-0 left-0 right-0 h-[100px] bg-white w-[100%] z-1`}
  `,
  LogoLink: styled(Link)`
    ${tw`flex items-center text-6xl text-brand`}
  `,
  LogoName: styled.h1`
    font-family: 'Modak', cursive;
  `,
};
