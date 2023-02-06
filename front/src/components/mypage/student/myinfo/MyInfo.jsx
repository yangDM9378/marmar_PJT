import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useAuth from '../../../../hooks/queries/useAuth';
import ChangeEmail from '../../ChangeForm/ChangeEmail';
import ChangeName from '../../ChangeForm/ChangeName';
import ChangePassword from '../../ChangeForm/ChangePassword';
import ChangePasswordHelper from '../../ChangeForm/ChangePasswordHelper';
import ChangePhone from '../../ChangeForm/ChangePhone';

export default function MyInfo() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  return (
    <S.Container>
      <ChangeEmail
        label="이메일"
        button="이메일 변경"
        placeholder={student?.studentEmail}
      />
      <ChangeName
        label="아이 이름"
        button="아이 이름 변경"
        placeholder={student?.studentName}
      />
      <ChangeName
        label="보호자 이름"
        button="보호자 이름 변경"
        placeholder={student?.studentNameHelper}
      />
      <ChangePhone
        label="전화번호"
        button="전화번호 변경"
        placeholder={student?.studentPhoneHelper}
      />
      <ChangePassword />
      <ChangePasswordHelper />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`space-y-5`}
  `,
};
