import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import tw from 'twin.macro';
import { searchClassStudentApi } from '../../../api/programApi';
import StudentList from './StudentList';

export default function SelectStudent(props) {
  const { setStudent, join, getName } = props;
  const recent = JSON.parse(localStorage.getItem('recentClass'));
  const [text, setText] = useState(
    '수업을 시작하기 위해 학생의 이름을 입력해주세요. 클릭하여 수업 시작',
  );

  const [search, setSearch] = useState('');

  const onInput = e => {
    setSearch(e.target.value);
  };

  const {
    // isLoading,
    // error,
    data: students,
  } = useQuery({
    queryKey: ['registerdStudents', search],
    queryFn: () => searchClassStudentApi(search),
    enabled: !!search,
    onSuccess: data => {
      if (data.data.length > 0) {
        setText('수업을 시작할 학생의 이름을 클릭해주세요');
      }
      if (data.data.length === 0) {
        setText('수업을 시작하기 위해 학생의 이름을 입력해주세요');
      }
    },
    onError: error => {
      console.log(error);
    },
  });
  return (
    <S.SearchBox>
      <S.Header>
        수업 시작하기
        <p>{text}</p>
      </S.Header>
      <S.SeachDiv>
        <AiOutlineSearch />
        <S.SeachInput type="text" onChange={onInput} />
      </S.SeachDiv>
      {!search && !students && <p className="font-bold">RECENT</p>}
      <S.ResultBox>
        {students &&
          students.data.length > 0 &&
          students.data.map(student => (
            <StudentList
              key={student.num}
              student={student}
              setStudent={setStudent}
              join={join}
              getName={getName}
            />
          ))}

        {!search &&
          !students &&
          recent &&
          recent.map(student => (
            <StudentList
              key={student.num}
              student={student}
              setStudent={setStudent}
              join={join}
              getName={getName}
            />
          ))}
      </S.ResultBox>
    </S.SearchBox>
  );
}

const S = {
  SearchBox: styled.div`
    ${tw`min-h-[30vh] max-h-[50vh] min-w-[500px] bg-white rounded-xl p-5`}
  `,
  Header: styled.div`
    ${tw`text-2xl font-semibold`}
    p {
      ${tw`text-xs my-2`}
    }
  `,
  SeachDiv: styled.div`
    ${tw`relative border-2 flex justify-center items-center px-3 mb-2`}
  `,
  SeachInput: styled.input`
    ${tw`w-full focus:outline-0 h-10`}
  `,
  ResultBox: styled.div`
    ${tw`bg-slate-100 rounded max-h-[220px] overflow-y-scroll`}
  `,
};
