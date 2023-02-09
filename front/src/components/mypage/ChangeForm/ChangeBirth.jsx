/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useModify from '../../../hooks/queries/useModify';

const schema = yup
  .object({
    birth: yup.string().required('생년월일을 입력해주세요.'),
  })
  .required();

export default function ChangeBirth(props) {
  const { label, button } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { useModBirth } = useModify();

  const onChangeBirth = async data => {
    console.log(data);
    useModBirth.mutate(data);
    alert('생년월일 정보가 변경되었습니다.');
  };

  return (
    <S.Form onSubmit={handleSubmit(onChangeBirth)}>
      <S.Label htmlFor="birth">{label}</S.Label>
      <S.InputBox>
        <S.Input {...register('birth')} type="date" id="birth" />
        <S.Button type="submit">{button}</S.Button>
      </S.InputBox>
      <S.ErrorMsg>{errors.birth?.message}</S.ErrorMsg>
    </S.Form>
  );
}

const S = {
  Form: styled.form`
    ${tw`border-b-2 pb-3`}
  `,
  Label: styled.label`
    ${tw`flex pb-2 font-bold`}
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
