import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useAuth from '../../../../hooks/queries/useAuth';
import ChangeDepartment from '../../ChangeForm/ChangeDepartment';
import ChangeName from '../../ChangeForm/ChangeName';
import ChangePassword from '../../ChangeForm/ChangePassword';
import ChangePhone from '../../ChangeForm/ChangePhone';

export default function MyInfoComponent() {
  const { useTherapistCheck } = useAuth();
  const { data: therapist } = useTherapistCheck();
  return (
    <S.Container>
      <ChangeName
        label="이름"
        button="이름 변경"
        placeholder={therapist?.therapistName}
        check="therapist"
      />
      <ChangeDepartment
        label="소속 기관"
        button="소속 기관 변경"
        placeholder={therapist?.therapistDepartment}
      />
      <ChangePhone
        label="전화번호"
        button="전화번호 변경"
        placeholder={therapist?.therapistPhone}
      />
      <ChangePassword />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`space-y-5 p-3`}
  `,
};
