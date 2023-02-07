import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeGameBody() {
  return (
    <S.Box>
      <div>
        <div>서비스를 소개합니다</div>
        <p>차별없는 서비스</p>
      </div>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    ${tw`flex px-8 bg-blue-800 text-white md:h-[200px] lg:h-[500px]`}
  `,
};
