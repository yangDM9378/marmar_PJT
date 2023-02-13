import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import useEvaluate from '../../../hooks/queries/useEvaluate';

export default function Evaluation({ studentNum, onEvalSubmit }) {
  const { useEvaluation } = useEvaluate();
  const [comment, setComments] = useState('');
  const [evalAbility, setevalAbility] = useState(0);
  const [evalAttitude, setEvalAttitude] = useState(0);
  const [evalConcentration, setEvalConcentration] = useState(0);
  const handleTextArea = e => {
    setComments(e.target.value);
    // console.log(comment);
  };
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
    const comments = () => {
      return comment.replaceAll('<br>', '\r\n');
    };

    useEvaluation.mutate({
      studentNum,
      evalAbility,
      evalAttitude,
      evalConcentration,
      comments: comments(),
    });
    onEvalSubmit();
  };

  return (
    <S.EvalSection>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>오늘의 수업일지</S.Title>
        <div className="grid grid-cols-2">
          <S.LeftBox>
            <S.InputBox>
              <S.Label htmlFor="수행능력">
                <span>수행능력</span>을 평가해주세요
              </S.Label>
              <S.Rater total={5} rating={0} onRate={rateAbility} />
            </S.InputBox>

            <S.InputBox>
              <S.Label htmlFor="수업태도">
                <span>수행태도</span>를 평가해주세요
              </S.Label>
              <S.Rater total={5} rating={0} onRate={rateAttitude} />
            </S.InputBox>

            <S.InputBox>
              <S.Label htmlFor="수업집중도">
                <span>수업집중도</span>를 평가해주세요
              </S.Label>
              <S.Rater total={5} rating={0} onRate={rateConcentration} />
            </S.InputBox>
          </S.LeftBox>
          <S.RightBox>
            <S.InputBox className="relative">
              <S.Label htmlFor="수업집중도">
                <div className="text-black text-center">
                  오늘 수업 결과를 적어주세요
                </div>
              </S.Label>
              <S.Input
                type="text"
                placeholder="최대 200자까지 작성할 수 있습니다."
                maxLength={200}
                onChange={handleTextArea}
              />
              <div className="absolute right-3 bottom-4 text-slate-400">
                {comment.length}/200
              </div>
            </S.InputBox>
          </S.RightBox>
        </div>
        <div className="flex justify-center">
          <S.Button type="submit">제출하기</S.Button>
        </div>
      </S.Form>
    </S.EvalSection>
  );
}

const S = {
  EvalSection: styled.div``,
  Form: styled.form`
    ${tw`mt-[16vh] border-4 rounded-lg py-5 w-[900px] bg-white`}
  `,
  Title: styled.h1`
    ${tw`font-cafe24 m-5 text-3xl text-center`}
  `,
  InputBox: styled.div`
    ${tw`m-5 w-[300px] text-center`}
  `,
  Label: styled.label`
    ${tw`font-cafe24 text-black rounded-lg w-[150px] text-xl text-center`}
    span {
      ${tw`text-brand font-bold text-2xl`}
    }
  `,
  LeftBox: styled.div`
    ${tw`col-span-1 flex flex-col justify-center items-center`}
  `,
  RightBox: styled.div`
    ${tw`col-span-1 border-l-2 flex justify-center`}
  `,
  Input: styled.textarea`
    ${tw`h-72 rounded-xl w-72 mt-3 focus:outline-brand border-2 border-black p-3`}
  `,
  Button: styled.button`
    ${tw`m-5 font-cafe24 bg-brand text-white hover:bg-brandHover rounded-lg p-5 w-[200px] text-xl`}
  `,
  Rater: styled(Rater)`
    ${tw`flex text-5xl justify-center`}
  `,
};
