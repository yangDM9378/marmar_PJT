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
  // const goFindPw = () => {
  //   navigate('/Login/FindPw');
  // };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      className="h-fit w-[600px] bg-white rounded-xl mx-auto mt-20  p-3"
    >
      <S.ModalHeader>
        <div className="flex justify-end pb-3">
          <button type="button" onClick={close}>
            x
          </button>
        </div>
        <div className="flex justify-center font-cafe24">아이디 찾기</div>
      </S.ModalHeader>
      <S.ModalIdBox>
        <div>
          고객님의 정보와 일치하는 아이디는&nbsp;
          <span className="font-bold">{id}</span>입니다.
        </div>
      </S.ModalIdBox>
      <S.ModalFooter>
        <S.ModalButton type="button" onClick={goSignIn}>
          로그인페이지 이동
        </S.ModalButton>
      </S.ModalFooter>
    </ReactModal>
  );
}
const S = {
  ModalHeader: styled.div`
    ${tw`font-extrabold ml-3 p-3 text-xl`}
  `,
  ModalButton: styled.button`
    ${tw`p-3 border-2 mt-3 rounded-xl w-48 bg-brand text-white font-bold`}
  `,
  ModalFooter: styled.div`
    ${tw`flex justify-center space-x-6 pb-3`}
  `,
  ModalIdBox: styled.div`
    ${tw`text-lg mt-2 relative border-2 rounded-xl h-28 flex justify-center items-center`}
  `,
};
