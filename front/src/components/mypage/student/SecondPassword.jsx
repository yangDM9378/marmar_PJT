import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import tw from 'twin.macro';
import useAuth from '../../../hooks/queries/useAuth';

export default function SecondPassword(props) {
  const { setIsParent } = props;
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const [pw, setPw] = useState('');
  const onPwChange = e => {
    setPw(e.target.value);
  };
  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onSubmit = () => {
    if (student.studentPasswordHelper === pw) {
      setIsParent(true);
      setPw('');
    } else {
      setPw('');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `2차 비밀번호가 틀렸습니다. 다시 입력해주세요.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <S.Container className="bg-suabg-1 bg-contain">
      <S.Box>
        <S.Header>My Page</S.Header>
        <S.Input
          type="password"
          placeholder="2차 비밀번호 입력"
          onChange={onPwChange}
          onKeyPress={handleOnKeyPress}
        />
        <S.button type="button" onClick={onSubmit}>
          입장하기
        </S.button>
      </S.Box>
    </S.Container>
  );
}
// ${tw`px-10 mt-[100px] min-h-[71vh] bg-brand flex justify-center items-center`}
// ${tw`h-[70vh] bg-brand flex justify-center items-center`}
const S = {
  Container: styled.div`
    ${tw`px-10 mt-[90px] min-h-screen bg-brand flex justify-center items-center`}
  `,
  Box: styled.div`
    ${tw`flex flex-col p-20 rounded-xl space-y-3 bg-white`}
  `,
  Header: styled.div`
    ${tw`text-3xl font-cafe24 text-center mb-10`}
  `,
  Input: styled.input`
    ${tw`border-2 border-brand rounded-xl p-3`}
  `,
  button: styled.button`
    ${tw`text-xl text-white font-cafe24 bg-brand rounded-xl p-3`}
  `,
};
