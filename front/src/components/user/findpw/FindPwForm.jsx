/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { findPwApi } from '../../../api/userApi';

const schema = yup
  .object({
    email: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('이메일를 입력해주세요.'),
    id: yup.string().required('아이디를 입력해주세요.'),
    check: yup
      .string()
      .required('회원 유형을 선택해주세요')
      .nullable()
      .oneOf(['STUDENT', 'THERAPIST']),
  })
  .required();

export default function FindPwForm() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [isFail, setIsFail] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const mutation = useMutation(findPwApi);
  const onFindPw = e => {
    mutation.mutate(
      { id: e.id, email: e.email, role: e.check },
      {
        onError: () => {
          setIsFail(true);
        },
        onSuccess: data => {
          if (data) {
            setIsFail(false);
            alert('가입된 이메일로 임시비밀번호가 발급되었습니다.');
            navigate('/SignIn');
          } else {
            setIsFail(true);
            console.log('qwdq');
          }
        },
      },
    );
  };
  return (
    <S.FindForm onSubmit={handleSubmit(onFindPw)}>
      <S.CheckUserBox>
        <S.Ul>
          <li>
            <S.CheckInput
              {...register('check')}
              type="radio"
              id="hosting-small"
              name="check"
              value="STUDENT"
              className="peer"
            />
            <S.CheckLabel htmlFor="hosting-small">
              <div className="block">
                <div className="w-full text-center">학생</div>
              </div>
            </S.CheckLabel>
          </li>
          <li>
            <S.CheckInput
              {...register('check')}
              type="radio"
              id="hosting-big"
              name="check"
              value="THERAPIST"
              className="peer"
            />
            <S.CheckLabel htmlFor="hosting-big">
              <div className="block">
                <div className="w-full">선생님</div>
              </div>
            </S.CheckLabel>
          </li>
        </S.Ul>
        <S.ErrorMsg>{errors.check?.message}</S.ErrorMsg>
      </S.CheckUserBox>
      <S.Input
        {...register('id')}
        type="text"
        placeholder="아이디를 입력해주세요"
      />
      <S.ErrorMsg>{errors.id?.message}</S.ErrorMsg>
      <S.Input
        {...register('email')}
        placeholder="이메일을 입력해주세요"
        type="email"
      />
      <S.ErrorMsg>{errors.email?.message}</S.ErrorMsg>
      <S.FailMsg className={`${isFail ? '' : 'hidden'}`}>
        이메일 또는 아이디를 잘못 입력했습니다.
        <br />
        입력하신 내용을 다시 확인해주세요.
      </S.FailMsg>
      <S.Button type="submit">비밀번호 재설정</S.Button>
    </S.FindForm>
  );
}

const S = {
  FindForm: styled.form`
    ${tw`py-10`}
  `,
  CheckUserBox: styled.div`
    ${tw`mb-3`}
  `,
  Ul: styled.ul`
    ${tw`grid w-full grid-cols-2 gap-3`}
  `,
  CheckInput: styled.input`
    ${tw`hidden`}
  `,
  CheckLabel: styled.label`
    ${tw`inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-brand peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
  `,
  Input: styled.input`
    ${tw`block w-full bg-transparent outline-none border-2 rounded-md py-2 px-4 placeholder-slate-400 focus:border-brand`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
  FailMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
  Button: styled.button`
    ${tw`bg-brand w-full py-2 px-4 rounded-md font-cafe24 text-white hover:bg-brandHover`}
  `,
};
