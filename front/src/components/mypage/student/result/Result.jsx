import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getResultApi } from '../../../../api/mypageApi';
import useAuth from '../../../../hooks/queries/useAuth';
import MyCalender from '../calender/MyCalender';
import Graph from './Graph';

export default function Result() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const { data: evaluations } = useQuery({
    queryKey: ['evaluations', student.num],
    queryFn: () => getResultApi(student.num),
    onSuccess: res => {
      // console.log(res.data);
    },
    onError: err => {
      // console.log(err);
    },
  });
  return (
    <div className="space-y-10">
      <MyCalender />
      <Graph evaluations={evaluations} />
    </div>
  );
}
