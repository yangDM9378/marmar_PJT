import React from 'react';
import Modal from 'react-modal';

export default function CorrectModal({ isOpen, close }) {
  setTimeout(() => {
    close();
  }, 3000);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      onClick={() => close()}
      className="h-[50vh] w-[50vh] rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <img src="/modal/2.png" alt="" />
      <div className="flex justify-center items-center text-[45px] font-cafe24 font-bold mt-3">
        정답입니다
      </div>
    </Modal>
  );
}
