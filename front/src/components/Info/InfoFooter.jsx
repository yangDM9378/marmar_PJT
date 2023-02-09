import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { RiBookMarkFill, RiVideoChatLine } from 'react-icons/ri';
import { MdLibraryBooks } from 'react-icons/md';

export default function InfoFooter() {
  return (
    <S.InfoFooter>
      <S.InfoFooterTitle>
        <p>온/오프라인 병행 치료를 위한 마르마르</p>
      </S.InfoFooterTitle>
      <S.InfoFooterBody>
        <S.Container>
          <S.BoxImg className="bg-orange-100">
            <RiBookMarkFill />
          </S.BoxImg>
          <S.BoxContent>
            <p>다양한</p>
            <p className="text-yellow-300">교육컨텐츠</p>
          </S.BoxContent>
        </S.Container>
        <S.Container>
          <S.BoxImg className="bg-blue-900">
            <RiVideoChatLine />
          </S.BoxImg>
          <S.BoxContent>
            <p>온/오프수업을 통한</p>
            <p className="text-yellow-300">지속적인 치료 관리</p>
          </S.BoxContent>
        </S.Container>
        <S.Container>
          <S.BoxImg className="bg-blue-300">
            <MdLibraryBooks />
          </S.BoxImg>
          <S.BoxContent>
            <p>실무자가 엄선한</p>
            <p className="text-yellow-300">교육자료 제공</p>
          </S.BoxContent>
        </S.Container>
      </S.InfoFooterBody>
    </S.InfoFooter>
  );
}

const S = {
  InfoFooter: styled.div`
    ${tw`bg-brand h-[78vh]`}
  `,
  InfoFooterTitle: styled.div`
    ${tw`flex justify-center items-center h-[30vh] pt-[10vh] text-white text-[5vh] font-bold`}
  `,
  InfoFooterBody: styled.div`
    ${tw`flex justify-center items-center px-[8vh] h-[42vh] w-[70vw] m-auto`}
  `,
  Container: styled.div`
    ${tw`flex-col w-[25vw] mt-[6vh]`}
  `,
  BoxImg: styled.div`
    ${tw`flex justify-center items-center h-[20vh] w-[20vh] m-auto rounded-3xl text-[11vh] text-white`}
  `,
  BoxContent: styled.div`
    ${tw`text-center mt-[4vh] text-[3vh] text-white font-bold`}
  `,
};
