import React from 'react';
import StudentVideoRoom from '../../components/openvidu/student/StudentVideoRoom';
import TherapistVideoRoom from '../../components/openvidu/therapist/TherapistVideoRoom';
import useAuth from '../../hooks/queries/useAuth';

export default function OpenVidu() {
  const { useStudentCheck, useTherapistCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const { data: therapist } = useTherapistCheck();
  return (
    <div>
      {therapist && <TherapistVideoRoom />}
      {student && <StudentVideoRoom />}
    </div>
  );
}
