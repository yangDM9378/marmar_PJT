import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function Evaluation() {
  return (
    <S.EvalSection>
      <S.Form onSubmit="">
        <S.Title>오늘 수업은 어떠셨나요?</S.Title>
        <S.InputBox>
          <S.Label htmlFor="수업집중도">수업집중도</S.Label>
        </S.InputBox>

        <S.InputBox>
          <S.Label htmlFor="목표달성도">목표달성도</S.Label>
        </S.InputBox>

        <S.InputBox>
          <S.Label htmlFor="수업총평">수업 총평</S.Label>
        </S.InputBox>

        <S.Button type="submit">제출하기</S.Button>
      </S.Form>
    </S.EvalSection>
  );
}

const S = {
  EvalSection: styled.div`
    ${tw`flex-col items-center`}
  `,
  Form: styled.form`
    ${tw`mt-[12vh] border-4 rounded-lg p-5 w-[550px]`}
  `,
  Title: styled.h1`
    ${tw`font-cafe24 m-5 text-3xl text-center`}
  `,
  InputBox: styled.div`
    ${tw`m-10 border-4 border-black flex`}
  `,
  Label: styled.label`
    ${tw`font-cafe24 bg-brand text-white rounded-lg p-5 w-[150px] text-xl text-center`}
  `,
  Input: styled.input`
    ${tw`p-3 rounded-xl mr-3 w-full min-w-[160px] focus:outline-brand`}
  `,
  Button: styled.button`
    ${tw`font-cafe24 bg-brand text-white hover:bg-brandHover rounded-lg p-5 w-[200px] text-xl`}
  `,
};
