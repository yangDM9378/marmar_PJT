import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import useEvaluate from '../../../hooks/queries/useEvaluate';

export default function Evaluation({ studentNum, onEvalSubmit }) {
  const { useEvaluation } = useEvaluate();
  const [evalAbility, setevalAbility] = useState(0);
  const [evalAttitude, setEvalAttitude] = useState(0);
  const [evalConcentration, setEvalConcentration] = useState(0);
  const rateAbility = e => {
    setevalAbility(e.rating);
  };
  const rateAttitude = e => {
    setEvalAttitude(e.rating);
  };
  const rateConcentration = e => {
    setEvalConcentration(e.rating);
  };
  const handleSubmit = e => {
    e.preventDefault();
    useEvaluation.mutate({
      studentNum,
      evalAbility,
      evalAttitude,
      evalConcentration,
    });
    onEvalSubmit();
  };

  return (
    <S.EvalSection>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>오늘 수업은 어떠셨나요?</S.Title>

        <S.InputBox>
          <S.Label htmlFor="수행능력">수행능력</S.Label>
          <S.Rater total={5} rating={0} onRate={rateAbility} />
        </S.InputBox>

        <S.InputBox>
          <S.Label htmlFor="수업태도">수업태도</S.Label>
          <S.Rater total={5} rating={0} onRate={rateAttitude} />
        </S.InputBox>

        <S.InputBox>
          <S.Label htmlFor="수업집중도">수업집중도</S.Label>
          <S.Rater total={5} rating={0} onRate={rateConcentration} />
        </S.InputBox>

        <S.Button type="submit">제출하기</S.Button>
      </S.Form>
    </S.EvalSection>
  );
}

const S = {
  EvalSection: styled.div`
    position: fixed;
    top: 10%;
    left: 37%;
  `,
  Form: styled.form`
    ${tw`mt-[12vh] border-4 rounded-lg py-5 w-[550px] flex flex-col items-center bg-white`}
  `,
  Title: styled.h1`
    ${tw`font-cafe24 m-5 text-3xl text-center`}
  `,
  InputBox: styled.div`
    ${tw`m-5 flex justify-evenly`}
  `,
  Label: styled.label`
    ${tw`mr-5 font-cafe24 bg-brand text-white rounded-lg p-5 w-[150px] text-xl text-center`}
  `,
  Input: styled.input`
    ${tw`p-3 rounded-xl mr-3 w-full min-w-[160px] focus:outline-brand`}
  `,
  Button: styled.button`
    ${tw`m-5 font-cafe24 bg-brand text-white hover:bg-brandHover rounded-lg p-5 w-[200px] text-xl`}
  `,
  Rater: styled(Rater)`
    ${tw`flex text-5xl justify-center`}
  `,
};
