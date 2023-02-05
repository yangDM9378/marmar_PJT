/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { findIdApi } from '../../../api/userApi';
import FindIdModal from './FindIdModal';

const schema = yup
  .object({
    email: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('이메일를 입력해주세요.'),
    name: yup.string().required('이름을 입력해주세요.'),
    check: yup
      .string()
      .required('회원 유형을 선택해주세요')
      .nullable()
      .oneOf(['STUDENT', 'THERAPIST']),
  })
  .required();

export default function FindIdForm() {
  const [isFail, setIsFail] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState();
  const handleModal = () => {
    setOpen(!isOpen);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const mutation = useMutation(findIdApi);
  const onFindId = e => {
    mutation.mutate(
      { name: e.name, email: e.email, role: e.check },
      {
        onError: () => {
          setIsFail(true);
        },
        onSuccess: data => {
          setIsFail(false);
          setOpen(!isOpen);
          setId(data.data);
        },
      },
    );
  };
  return (
    <div>
      <S.FindForm onSubmit={handleSubmit(onFindId)}>
        <FindIdModal isOpen={isOpen} close={handleModal} id={id} />
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
              <S.CheckLabel
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
              >
                <div className="block">
                  <div className="w-full">선생님</div>
                </div>
              </S.CheckLabel>
            </li>
          </S.Ul>
          <S.ErrorMsg>{errors.check?.message}</S.ErrorMsg>
        </S.CheckUserBox>
        <S.Input
          {...register('email')}
          placeholder="이메일을 입력해주세요"
          type="email"
        />
        <S.ErrorMsg>{errors.email?.message}</S.ErrorMsg>
        <S.Input
          {...register('name')}
          type="text"
          placeholder="이름을 입력해주세요"
        />
        <S.ErrorMsg>{errors.name?.message}</S.ErrorMsg>
        <S.FailMsg className={`${isFail ? '' : 'hidden'}`}>
          이메일 또는 이름를 잘못 입력했습니다.
          <br />
          입력하신 내용을 다시 확인해주세요.
        </S.FailMsg>
        <S.Button type="submit">아이디 찾기</S.Button>
      </S.FindForm>
    </div>
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
