import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';

export default function FindIdFooter() {
  const navigate = useNavigate();
  const onGoFindPw = () => {
    navigate('/Login/FindPw');
  };
  return (
    <S.FooterBox>
      <span>비밀번호를 찾으시나요?</span>
      <S.Btn type="button" onClick={onGoFindPw}>
        비밀번호 찾기
      </S.Btn>
    </S.FooterBox>
  );
}

const S = {
  FooterBox: styled.div`
    ${tw`border-t-2 w-full text-xs text-center py-4 text-slate-400 flex space-x-5 justify-center`}
  `,
  Btn: styled.button`
    ${tw`text-xs font-bold text-red-400`}
  `,
};
