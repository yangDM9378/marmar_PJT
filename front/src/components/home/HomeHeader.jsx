import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeHeader() {
  return (
    <div>
      <S.Container className="bg-main-bg bg-cover bg-no-repeat" />
    </div>
  );
}

const S = {
  Container: styled.div`
    ${tw`h-96 md:h-[580px] lg:h-[670px]`}
  `,
};
