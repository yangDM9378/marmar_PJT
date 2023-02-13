/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BarChart from './BarChart';
import { getResultApi } from '../../../../api/mypageApi';
import useAuth from '../../../../hooks/queries/useAuth';

export default function ShowResult() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const { data: evaluations } = useQuery({
    queryKey: ['evaluations', student.num],
    queryFn: () => getResultApi(student.num),
    onSuccess: res => {
      console.log(res.data);
    },
    onError: () => {},
  });
  const [userData, setUserData] = useState({
    labels: evaluations?.data.map(e => e.evalDate.substr(2, 9)),
    datasets: [
      {
        label: '수행능력',
        data: evaluations?.data.map(e => e.evalAbility),
        backgroundColor: ['#42a5f4'],
        borderColor: '#42a5f4',
        borderWidth: 5,
        // lineTension: 0.1,
        pointRadius: 5,
      },
      {
        label: '수업태도',
        data: evaluations?.data.map(e => e.evalAttitude),
        backgroundColor: ['#ffca28'],
        borderColor: '#ffca28',
        borderWidth: 5,
        pointRadius: 5,
      },
      {
        label: '수업집중도',
        data: evaluations?.data.map(e => e.evalConcentration),
        backgroundColor: ['#64dd17'],
        borderColor: '#64dd17',
        borderWidth: 5,
        pointRadius: 5,
      },
    ],
  });
  return (
    <S.Container>
      <p className="font-cafe24 text-[40px] pb-10">상담결과</p>
      <div style={{ width: 1000 }}>
        <BarChart chartData={userData} />
      </div>
    </S.Container>
  );
}
const S = {
  Container: styled.div`
    ${tw`h-fit w-full pb-20 pt-5  m-5 justify-center text-center`}
  `,
};
