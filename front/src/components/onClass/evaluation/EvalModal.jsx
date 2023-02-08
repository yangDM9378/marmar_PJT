import React from 'react';
import Modal from 'react-modal';
import Evaluation from './Evaluation';

export default function EvalModal({ isOpen, close, studentNum }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => close()} ariaHideApp={false}>
      <Evaluation studentNum={studentNum} />
    </Modal>
  );
}
