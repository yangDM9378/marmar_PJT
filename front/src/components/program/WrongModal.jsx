/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Modal from 'react-modal';

export default function CollectModal({ isOpen, close }) {
  if (isOpen) {
    setTimeout(() => {
      close();
    }, 2500);
  }
  return (
    <Modal
      isOpen={isOpen}
      // onRequestClose={() => close()}
      ariaHideApp={false}
      className="h-[50vh] w-[50vh]  rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <img src="/modal/1.png" alt="" />
      <div className="flex justify-center items-center text-[45px] font-cafe24 font-bold mt-3">
        다시해보세요
      </div>
    </Modal>
  );
}
