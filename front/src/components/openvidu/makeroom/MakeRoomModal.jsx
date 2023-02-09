import React from 'react';
import ReactModal from 'react-modal';
import SelectStudent from './SelectStudent';

export default function MakeRoomModal({ isOpen, close }) {
  const style = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      style={style}
      className="h-fit w-fit bg-brandHover rounded-xl m-auto mt-[150px]"
    >
      <SelectStudent close={close} />
    </ReactModal>
  );
}
