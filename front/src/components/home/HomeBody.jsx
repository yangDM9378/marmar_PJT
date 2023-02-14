import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeBody() {
  return (
    <S.LogoAndContent>
      <S.LogoAndContentFlex>
        <S.Logo>
          {/* <S.Img className="bg-main-bg-1 bg-cover bg-no-repeat" /> */}
          {/* <img src="logo.png" alt="" className="animate-bounceright" />
          <img
            src="/img/background/sualogo.png"
            alt=""
            className="w-full h-full animate-bounce"
          /> */}
          <img src="logo.png" alt="" className="w-[250px]" />
        </S.Logo>
        <S.Content>
          어린이 의사소통 플랫폼 <span> </span>
          <S.Name>마르마르</S.Name>를 통해
        </S.Content>
        <S.Content>언어재활사와 1:1 맞춤 서비스를 제공받아보세요.</S.Content>
      </S.LogoAndContentFlex>
    </S.LogoAndContent>
  );
}

const S = {
  LogoAndContent: styled.div`
    ${tw`flex justify-center items-center h-[60vh] w-full`}
  `,
  LogoAndContentFlex: styled.div`
    ${tw`flex-col text-center`}
  `,
  Logo: styled.div`
    ${tw`flex justify-center items-center mb-10`}
  `,
  Img: styled.div`
    ${tw`w-[35vw] h-[20vh]`}
  `,
  Content: styled.p`
    ${tw`text-[28px] font-cafe24`}
  `,
  Name: styled.span`
    ${tw`text-brand`}
  `,
};
