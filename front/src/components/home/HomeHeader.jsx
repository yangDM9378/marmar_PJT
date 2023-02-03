import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeHeader() {
  return (
    <S.Container className="bg-main-bg bg-cover bg-no-repeat">
      <S.Box>QWDWQ</S.Box>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`h-96 md:h-[600px]`}
  `,
  Box: styled.div`
    ${tw``}
  `,
};
