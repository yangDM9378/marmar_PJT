import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import useEvaluate from '../../../hooks/queries/useEvaluate';

export default function Evaluation({ studentNum }) {
  const { useEvaluation } = useEvaluate();
  const [evalConcentration, setEvalConcentration] = useState(0);
  const [evalAchieve, setEvalAchieve] = useState(0);
  const [evalEntire, setEvalEntire] = useState(0);
  const rateConcentration = e => {
    setEvalConcentration(e.rating);
  };
  const rateAchieve = e => {
    setEvalAchieve(e.rating);
  };
  const rateEntire = e => {
    setEvalEntire(e.rating);
  };
  const handleSubmit = e => {
    e.preventDefault();
    useEvaluation.mutate({
      studentNum,
      evalConcentration,
      evalAchieve,
      evalEntire,
    });
  };

  return (
    <S.EvalSection>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>오늘 수업은 어떠셨나요?</S.Title>
        <S.InputBox>
          <S.Label htmlFor="수업집중도">수업집중도</S.Label>
          <S.Rater total={5} rating={0} onRate={rateConcentration} />
        </S.InputBox>

        <S.InputBox>
          <S.Label htmlFor="목표달성도">목표달성도</S.Label>
          <S.Rater total={5} rating={0} onRate={rateAchieve} />
        </S.InputBox>

        <S.InputBox>
          <S.Label htmlFor="수업총평">수업 총평</S.Label>
          <S.Rater total={5} rating={0} onRate={rateEntire} />
        </S.InputBox>
        <S.Button type="submit">제출하기</S.Button>
      </S.Form>
    </S.EvalSection>
  );
}

const S = {
  EvalSection: styled.div`
    ${tw``}
  `,
  Form: styled.form`
    ${tw`mt-[12vh] border-4 rounded-lg p-5 w-[550px] flex-col items-center`}
  `,
  Title: styled.h1`
    ${tw`font-cafe24 m-5 text-3xl text-center`}
  `,
  InputBox: styled.div`
    ${tw`m-10 flex justify-evenly`}
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
  Rater: styled(Rater)`
    ${tw`flex text-5xl justify-center`}
  `,
};
