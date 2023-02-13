/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { getResultApi } from '../../../../api/mypageApi';
import useAuth from '../../../../hooks/queries/useAuth';
import './MyCalender.css';
import ResultModal from './ResultModal';

export default function MyCalender() {
  const client = useQueryClient();

  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();

  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);

  const [resultDate, setResultDate] = useState('');
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!isOpen);
  };

  const { data: calender } = useQuery({
    queryKey: ['calender', student.num],
    queryFn: () => getResultApi(student.num),
    onSuccess: data => {
      const arr = [];
      data.data.forEach(el => {
        arr.push(el.evalDate.substr(0, 10));
      });
      setMark(arr);
      // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
    },
  });
  const handleDay = async e => {
    await setResultDate(moment(e).format('YYYY-MM-DD'));
    await client.invalidateQueries(['daily']);
    await setOpen(!isOpen);
  };
  return (
    <div>
      <div className="mt-10 mb-5 font-cafe24 text-[40px] text-center">
        상담 내역
      </div>
      <Calendar
        onChange={onChange}
        value={value}
        locale="ko-KR"
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정onClickDay={handleDay}
        onClickDay={handleDay}
        calendarType="US"
        tileDisabled={({ date, view }) =>
          // moment(date).format('YYYY-MM-DD') > currDateTime
          !mark.find(x => x === moment(date).format('YYYY-MM-DD'))
        }
        tileClassName={({ date, view }) => {
          // console.log(mark);
          // console.log(moment(date).format('YYYY-DD-MM'));
          if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            // console.log('qwdqwd');
            return 'check';
          }
        }}
        tileContent={({ date, view }) => {
          if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            return (
              <div className="flex justify-center items-center absoluteDiv">
                <div className="dot" />
              </div>
            );
          }
        }}
      />
      <ResultModal
        isOpen={isOpen}
        close={handleModal}
        date={resultDate}
        num={student.num}
        calender={calender}
      />
    </div>
  );
}
