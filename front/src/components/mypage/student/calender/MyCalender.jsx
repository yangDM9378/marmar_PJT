/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { getResultApi } from '../../../../api/mypageApi';
import useAuth from '../../../../hooks/queries/useAuth';
import './MyCalender.css';

export default function MyCalender() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);

  const { data: log } = useQuery({
    queryKey: ['calender', student.num],
    queryFn: () => getResultApi(student.num),
    onSuccess: data => {
      const arr = [];
      console.log(data);
      data.data.forEach(el => {
        arr.push(el.evalDate.substr(0, 10));
      });
      setMark(arr);
      // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
    },
  });
  const handleDay = e => {
    console.log(e);
    console.log(moment(e).format('YYYY-DD-MM'));
    console.log(mark);
  };
  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-EN"
        onClickDay={handleDay}
        tileClassName={({ date, view }) => {
          // console.log(mark);
          // console.log(moment(date).format('YYYY-DD-MM'));
          if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            console.log('qwdqwd');
            return 'highlight';
          }
        }}
      />
    </div>
  );
}
