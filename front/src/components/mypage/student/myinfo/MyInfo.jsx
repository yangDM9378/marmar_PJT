import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useAuth from '../../../../hooks/queries/useAuth';
import ChangeName from '../../ChangeForm/ChangeName';
import ChangePassword from '../../ChangeForm/ChangePassword';
import ChangePasswordHelper from '../../ChangeForm/ChangePasswordHelper';
import ChangePhone from '../../ChangeForm/ChangePhone';
import ChangeBirth from '../../ChangeForm/ChangeBirth';

export default function MyInfo() {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  return (
    <S.Container>
      <ChangeName
        label="아이 이름"
        button="아이 이름 변경"
        placeholder={student?.studentName}
        check="name"
      />
      <ChangeName
        label="보호자 이름"
        button="보호자 이름 변경"
        placeholder={student?.studentNameHelper}
        check="nameHelper"
      />
      <ChangePhone
        label="전화번호"
        button="전화번호 변경"
        placeholder={student?.studentPhoneHelper}
      />
      <ChangeBirth label="생년월일" button="생년월일 변경" />
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
