import React from 'react';
import StudentLive from '../../components/openvidu/studentroom/StudentLive';
import Video from '../../components/openvidu/Video';
import useAuth from '../../hooks/queries/useAuth';

export default function OpenVidu() {
  const { useStudentCheck, useTherapistCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const { data: therapist } = useTherapistCheck();
  return (
    <div>
      {therapist && <Video />}
      {student && <StudentLive />}
    </div>
  );
}
