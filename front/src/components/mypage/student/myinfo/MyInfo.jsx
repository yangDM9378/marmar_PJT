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
      <p className="font-cafe24 text-[40px] pb-10">학생 정보 수정</p>
      <S.body>
        <ChangeName
          label="아이 이름"
          button="아이 이름 변경"
          placeholder={student?.studentName}
          check="name"
        />
        <br />
        <ChangeName
          label="보호자 이름"
          button="보호자 이름 변경"
          placeholder={student?.studentNameHelper}
          check="nameHelper"
        />
        <br />
        <ChangePhone
          label="전화번호"
          button="전화번호 변경"
          placeholder={student?.studentPhoneHelper}
        />
        <br />
        <ChangeBirth label="생년월일" button="생년월일 변경" />
        <br />
        <ChangePassword />
        <br />
        <ChangePasswordHelper />
        <br />
      </S.body>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`h-fit w-full pb-20 pt-5  m-5 justify-center text-center`}
  `,
  body: styled.div`
    ${tw`text-[20px] pl-10 pr-10`}
  `,
  // Container: styled.div`
  //   ${tw`space-y-5`}
  // `,
};
