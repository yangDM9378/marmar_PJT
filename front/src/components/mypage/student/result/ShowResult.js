/* eslint-disable no-unused-vars */
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
    labels: evaluations?.data.map(e => e.evalDate.substr(0, 10)),
    datasets: [
      {
        label: '수행능력',
        data: evaluations?.data.map(e => e.evalAbility),
        backgroundColor: ['blue'],
        borderColor: 'blue',
        borderWidth: 3,
      },
      {
        label: '수업태도',
        data: evaluations?.data.map(e => e.evalAttitude),
        backgroundColor: ['red'],
        borderColor: 'red',
        borderWidth: 3,
      },
      {
        label: '수업집중도',
        data: evaluations?.data.map(e => e.evalConcentration),
        backgroundColor: ['green'],
        borderColor: 'green',
        borderWidth: 3,
      },
    ],
  });
  return (
    <div style={{ width: 1000 }}>
      <BarChart chartData={userData} />
    </div>
  );
}
