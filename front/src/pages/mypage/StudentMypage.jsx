import React, { useEffect, useState } from 'react';
import Mypage from '../../components/mypage/student/Mypage';
import SecondPassword from '../../components/mypage/student/SecondPassword';

export default function StudentMypage() {
  const [isParent, setIsParent] = useState(false);
  useEffect(() => {
    setIsParent(localStorage.getItem('secondPw'));
  }, []);
  return (
    <div>
      {!isParent && <SecondPassword setIsParent={setIsParent} />}
      {isParent && <Mypage />}
    </div>
  );
}
