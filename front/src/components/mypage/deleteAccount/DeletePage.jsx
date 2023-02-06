import React from 'react';
import DeletePassword from './DeletePassword';
import useAuth from '../../../hooks/queries/useAuth';

export default function DeletePage() {
  const { useTherapistCheck, useStudentCheck } = useAuth();
  const { data: therapist } = useTherapistCheck();
  const { data: student } = useStudentCheck();

  return (
    <div>
      {therapist && <DeletePassword status="therapist" />}
      {student && <DeletePassword status="student" />}
      {!therapist && !student && (
        <h1>지금까지 마르마르를 이용해주셔서 감사합니다.</h1>
      )}
    </div>
  );
}
