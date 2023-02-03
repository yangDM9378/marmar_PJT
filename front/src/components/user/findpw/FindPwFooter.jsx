import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';

export default function FindPwFooter() {
  const navigate = useNavigate();
  const onGoFindId = () => {
    navigate('/Login/FindId');
  };
  return (
    <S.FooterBox>
      <span>아이디를 모르시나요?</span>
      <S.Btn type="button" onClick={onGoFindId}>
        아이디 찾기
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
