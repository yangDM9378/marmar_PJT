import React from 'react';
import Modal from 'react-modal';

export default function CollectModal({ isOpen, close }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => close()} ariaHideApp={false}>
      <div>틀렸다눙</div>
    </Modal>
  );
}
