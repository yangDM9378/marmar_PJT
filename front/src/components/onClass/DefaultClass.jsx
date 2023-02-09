import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useEffect, useState } from 'react';
import {
  // Slide,
  // Bounce,
  // Flip,
  // Hinge,
  // JackInTheBox,
  // Roll,
  // Zoom,
  Fade,
  Rotate,
} from 'react-awesome-reveal';

export default function DefaultClass() {
  const [time, setTime] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTime(true);
    }, 3500);
  });
  return (
    <S.ClassGameSection>
      {time && (
        <Rotate cascade damping={2e-1}>
          <div className="flex justify-center space-x-8">
            <S.SpanOne>단어 읽기</S.SpanOne>
            <S.SpanOne>시계 읽기</S.SpanOne>
            <S.SpanOne>그림 선택</S.SpanOne>
          </div>
        </Rotate>
      )}
      <S.Wrapper>
        {/* <S.Typding>마르마르 수업 시작</S.Typding> */}
        <Fade delay={0e3} cascade damping={2e-1}>
          마르마르 수업 시작
        </Fade>
      </S.Wrapper>
    </S.ClassGameSection>
  );
}
const S = {
  ClassGameSection: styled.section`
    ${tw`flex justify-center items-center p-10 h-full`}
    color: #fff;
    text-transform: uppercase;
    font-size: 42px;
    margin: 0;
    line-height: 47px;
    letter-spacing: 2px;
  `,
  SpanOne: styled.div`
    ${tw`animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black`}
  `,
  Wrap: styled.div`
    margin: 0 auto;
  `,
  Wrapper: styled.div`
    display: flex;
    ${tw`absolute top-[7%] left-[5%] font-flower text-8xl`}
  `,
  Typding: styled.div`
    width: 19ch;
    /* ch : 25개의 문자열을 포함 */
    animation: typing 3s steps(22), step-start infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    /* border-right: 3px solid; */
    font-family: monospace;
    font-size: 50px;
    @keyframes typing {
      from {
        width: 0;
      }
    }
    @keyframes blink {
      50% {
        border-color: transparent;
      }
    }
  `,
};
