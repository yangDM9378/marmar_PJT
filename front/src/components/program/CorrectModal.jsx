import React from 'react';
import Modal from 'react-modal';

export default function CorrectModal({ isOpen, close }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => close()} ariaHideApp={false}>
      <div>정답이라뉴</div>
    </Modal>
  );
}
