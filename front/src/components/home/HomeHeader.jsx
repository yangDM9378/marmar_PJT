import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeHeader() {
  return (
    <S.Container>
      <div>
        <S.Container className="bg-main-bg bg-cover bg-no-repeat" />
      </div>
      <S.Box>
        <div>
          <div>서비스를 소개합니다</div>
          <p>차별없는 서비스</p>
        </div>
      </S.Box>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`h-96 md:h-[580px] lg:h-[670px] `}
  `,
  Box: styled.div`
    ${tw`flex px-8 bg-blue-800 text-white md:h-[200px] lg:h-[500px]`}
  `,
};
