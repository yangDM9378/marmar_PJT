import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeBody() {
  return (
    <S.Box>
      <div>
        <div>logo</div>
        <p>내용</p>
      </div>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    ${tw`flex items-center justify-center py-20 md:h-[200px] lg:h-[320px] text-center`}
  `,
};
