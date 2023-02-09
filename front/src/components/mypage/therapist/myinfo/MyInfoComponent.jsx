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
      <p className="font-cafe24 text-[40px] pb-10">치료사 정보 수정</p>
      <S.body>
        <ChangeName
          label="이름"
          button="이름 변경"
          placeholder={therapist?.therapistName}
          check="therapist"
        />
        <br />
        <ChangeDepartment
          label="소속 기관"
          button="소속 기관 변경"
          placeholder={therapist?.therapistDepartment}
        />
        <br />
        <ChangePhone
          label="전화번호"
          button="전화번호 변경"
          placeholder={therapist?.therapistPhone}
        />
        <br />
        <ChangePassword />
      </S.body>
    </S.Container>
  );
}

// Container: styled.div`
//     ${tw`space-y-5 p-3`}
//   `,

const S = {
  Container: styled.div`
    ${tw`h-fit w-full pb-20 pt-5  m-5 justify-center text-center`}
  `,
  body: styled.div`
    ${tw`text-[20px] pl-10 pr-10`}
  `,
};
