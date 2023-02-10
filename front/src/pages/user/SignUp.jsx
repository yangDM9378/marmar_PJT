import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <S.SignUpSection>
      <S.SignUpBox>
        <S.SignUpHeader>회원가입</S.SignUpHeader>
        <S.SignUpMiniBox>
          <Link to="/SignUpStudent">
            <S.SignUpUserBox>
              <S.SignUpUserH1>사용자</S.SignUpUserH1>
              <S.Img src="student.png" alt="" />
            </S.SignUpUserBox>
          </Link>
          <Link to="/SignUpTherapist">
            <S.SignUpUserBox>
              <S.SignUpUserH1>치료사</S.SignUpUserH1>
              <S.Img src="therapist.png" alt="" />
            </S.SignUpUserBox>
          </Link>
        </S.SignUpMiniBox>
      </S.SignUpBox>
    </S.SignUpSection>
  );
}
// ${tw`p-[15vh 5vh] bg-brand min-h-[800px] flex justify-center items-center`}
const S = {
  SignUpSection: styled.div`
    ${tw`flex bg-brand h-[670px] mt-[100px] justify-center items-center`}}
  `,
  SignUpBox: styled.div`
    ${tw`bg-white rounded-3xl w-[700px] p-10`}
  `,
  SignUpHeader: styled.h1`
    ${tw`font-extrabold text-3xl text-center p-2 font-cafe24`}
  `,
  SignUpMiniBox: styled.div`
    ${tw`flex justify-around`}
  `,
  SignUpUserBox: styled.div`
    ${tw`bg-yellow-300 rounded-3xl pt-5 m-5 flex-col justify-center items-center`}
    &:hover {
      outline: 5px solid;
    }
  `,
  SignUpUserH1: styled.h1`
    ${tw`font-cafe24 font-extrabold text-3xl text-center mt-5`}
  `,
  Img: styled.img`
    ${tw``}
  `,
};
