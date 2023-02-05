import React from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function FindIdModal({ isOpen, close, id }) {
  const navigate = useNavigate();
  const goSignIn = () => {
    navigate('/SignIn');
  };
  const goFindPw = () => {
    navigate('/Login/FindPw');
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => close()}
      className="h-fit w-[600px] bg-white rounded-xl mx-auto mt-20  p-3"
    >
      <S.ModalHeader>
        <div>고객님의 정보와 일치하는 아이디는 다음과 같습니다.</div>
        <button type="button" onClick={close}>
          x
        </button>
      </S.ModalHeader>
      <S.ModalIdBox>{id}</S.ModalIdBox>
      <S.ModalFooter>
        <S.ModalButton type="button" onClick={goSignIn}>
          로그인하기
        </S.ModalButton>
        <S.ModalButton type="button" onClick={goFindPw}>
          비밀번호 찾기
        </S.ModalButton>
      </S.ModalFooter>
      <S.ModalFooter>
        <S.ModalButton type="button" onClick={goSignIn}>
          로그인하기
        </S.ModalButton>
        <S.ModalButton type="button" onClick={goFindPw}>
          비밀번호 찾기
        </S.ModalButton>
      </S.ModalFooter>
      <S.ModalFooter>
        <S.ModalButton type="button" onClick={goSignIn}>
          로그인하기
        </S.ModalButton>
        <S.ModalButton type="button" onClick={goFindPw}>
          비밀번호 찾기
        </S.ModalButton>
      </S.ModalFooter>
      <S.ModalFooter>
        <S.ModalButton type="button" onClick={goSignIn}>
          로그인하기
        </S.ModalButton>
        <S.ModalButton type="button" onClick={goFindPw}>
          비밀번호 찾기
        </S.ModalButton>
      </S.ModalFooter>
    </ReactModal>
  );
}
const S = {
  ModalHeader: styled.div`
    ${tw`flex justify-between`}
  `,
  ModalButton: styled.button`
    ${tw`p-3 border-2 mt-3 rounded-xl`}
  `,
  ModalFooter: styled.div`
    ${tw`flex justify-center space-x-6`}
  `,
  ModalIdBox: styled.div`
    ${tw`mt-2 relative border-2 rounded-xl h-24 flex justify-center items-center text-2xl`}
  `,
};
