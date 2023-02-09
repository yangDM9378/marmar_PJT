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
    phone: yup.string().required('전화번호를 입력해주세요.'),
  })
  .required();

export default function ChangePhone(props) {
  const { label, button, placeholder } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { useModPhone } = useModify();
  const onInput = e => {
    const data = e.target.value;
    if (data.length === 3 && e.nativeEvent.data !== null) {
      e.target.value = `${data}-`;
    }
    if (data.length === 8 && e.nativeEvent.data !== null) {
      e.target.value = `${data}-`;
    }
  };
  const onChangePhone = async data => {
    console.log(data);
    useModPhone.mutate(data);
  };
  return (
    <S.Form onSubmit={handleSubmit(onChangePhone)}>
      <S.Label htmlFor="phone">{label}</S.Label>
      <S.InputBox>
        <S.Input
          {...register('phone')}
          type="text"
          id="phone"
          maxLength="13"
          placeholder={placeholder}
          onChange={onInput}
        />
        <S.Button type="submit">{button}</S.Button>
      </S.InputBox>
      <S.ErrorMsg>{errors.phone?.message}</S.ErrorMsg>
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
