/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import './modal.css';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function VideoModal(props) {
  const { open } = props;
  return (
    <S.ModalDiv className={open ? 'modal openModal' : ''}>
      {open ? (
        <S.ModalSection>
          <main>{props.children}</main>
        </S.ModalSection>
      ) : null}
    </S.ModalDiv>
  );
}

const S = {
  ModalDiv: styled.div`
    ${tw`hidden fixed top-0 right-0 bottom-0 left-0 z-50`}
  `,
  ModalSection: styled.section`
    ${tw`w-full h-full bg-slate-400`}
  `,
};
