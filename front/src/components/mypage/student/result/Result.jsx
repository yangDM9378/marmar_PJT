import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getResultApi } from '../../../../api/mypageApi';
import useAuth from '../../../../hooks/queries/useAuth';

export default function Result() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const { data: result } = useQuery({
    queryKey: ['result', student.num],
    queryFn: () => getResultApi(student.num),
    onSuccess: res => {
      console.log(res.data);
    },
    onError: () => {},
  });
  const handleSubmit = () => {};
  return (
    <div>
      {result && <div>{result.data[0].num}</div>}
      <button type="button" onClick={handleSubmit}>
        {' '}
        button
      </button>
    </div>
  );
}
