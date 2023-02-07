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
    </div>
  );
}
