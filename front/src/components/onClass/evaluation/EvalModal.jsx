/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import tw from 'twin.macro';
import React from 'react';
import Modal from 'react-modal';
import Evaluation from './Evaluation';

export default function EvalModal({ isOpen, close, studentNum }) {
  const handleSubmit = () => {
    close();
  };
  return (
    <S.Modal isOpen={isOpen} ariaHideApp={false}>
      <Evaluation studentNum={studentNum} onEvalSubmit={handleSubmit} />
    </S.Modal>
  );
}

const S = {
  Modal: styled(Modal)`
    ${tw`w-[900px] bg-white mx-auto`}
  `,
};
