import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function Evaluation() {
  return (
    <div>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>

      <h1>수업 평가</h1>
      <S.Form>
        <h1>오늘 수업은 어떠셨나요?</h1>
        <S.InputBox>
          <S.Label htmlFor="수업집중도">수업집중도</S.Label>
          <S.Input type="number" id="수업집중도" name="evalConcentration" />
        </S.InputBox>

        <S.InputBox>
          <S.Label htmlFor="목표달성도">목표달성도</S.Label>
          <S.Input type="number" id="목표달성도" name="evalAchieve" />
        </S.InputBox>
        <S.InputBox>
          <S.Label htmlFor="수업총평">수업 총평</S.Label>
          <S.Input type="number" id="수업총평" name="evalEntire" />
        </S.InputBox>
        <S.Button type="submit">제출하기</S.Button>
      </S.Form>
    </div>
  );
}

const S = {
  Form: styled.form`
    border: 4px solid;
    padding: 10px;
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  InputBox: styled.div`
    margin: 10px;
    display: flex;
  `,
  Label: styled.label`
    ${tw`font-cafe24 bg-brand text-white`}
    border: 4px solid;
    border-radius: 10px;
    padding: 10px;
    width: 200px;
    font-size: 20px;
    text-align: center;
  `,
  Input: styled.input`
    ${tw`p-3 border-2 rounded-xl mr-3 w-full min-w-[160px]  focus:outline-brand`}
    border: 4px solid;
  `,
  Button: styled.button`
    ${tw`font-cafe24 bg-brand text-white`}
    border: 4px solid;
    border-radius: 10px;
    padding: 10px;
    width: 300px;
    font-size: 20px;
    text-align: center;
  `,
};
