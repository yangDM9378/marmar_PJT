/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    department: yup.string().required('소속기관을 입력해주세요.'),
  })
  .required();

export default function ChangeDepartment(props) {
  const { label, button, placeholder } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onChangeDepartment = async data => {
    console.log(data);
  };

  return (
    <S.Form onSubmit={handleSubmit(onChangeDepartment)}>
      <S.Label htmlFor="department">{label}</S.Label>
      <S.InputBox>
        <S.Input
          {...register('department')}
          type="text"
          id="department"
          placeholder={placeholder}
        />
        <S.Button type="submit">{button}</S.Button>
      </S.InputBox>
      <S.ErrorMsg>{errors.department?.message}</S.ErrorMsg>
    </S.Form>
  );
}

const S = {
  Form: styled.form`
    ${tw`border-b-2 pb-3`}
  `,
  Label: styled.label`
    ${tw`flex font-cafe24`}
  `,
  InputBox: styled.div`
    ${tw`flex`}
  `,
  Input: styled.input`
    ${tw`p-3 border-2 rounded-xl mr-3 w-full min-w-[160px]  focus:outline-brand`}
  `,
  Button: styled.button`
    ${tw`p-3 bg-brandHover text-white min-w-[160px] rounded-xl block`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-red-400 text-xs font-bold`}
  `,
};
