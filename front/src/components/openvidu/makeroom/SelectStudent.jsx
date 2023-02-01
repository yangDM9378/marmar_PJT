import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getRegisteredStudentApi } from '../../../api/mypageApi';
import StudentList from './StudentList';

export default function SelectStudent(props) {
  const { getStudentNum } = props;
  const {
    // isLoading,
    // error,
    data: students,
  } = useQuery({
    queryKey: ['registerdStudents'],
    queryFn: () => getRegisteredStudentApi(),
    onSuccess: () => {
      console.log(students);
    },
    onError: () => {
      console.log('QWDWQ');
    },
  });
  return (
    <div className="border-4 m-3 p-3 border-black">
      <p>학생 선택하기</p>
      {students &&
        students.data.map(student => (
          <StudentList
            key={student.num}
            student={student}
            getStudentNum={getStudentNum}
          />
        ))}
    </div>
  );
}
