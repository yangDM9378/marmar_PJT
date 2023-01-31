import React from 'react';
import MypageHeader from '../../components/mypage/therapist/MypageHeader';
import MypageSelectStudent from '../../components/mypage/therapist/MypageSelectStudent';
import MypageStudentList from '../../components/mypage/therapist/MypageStudentList';

export default function TherapistMypage() {
  return (
    <div>
      <MypageHeader />
      <MypageSelectStudent />
      <MypageStudentList />
    </div>
  );
}
