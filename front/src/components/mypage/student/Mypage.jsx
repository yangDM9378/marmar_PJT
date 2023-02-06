import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import MypageHeader from '../MypageHeader';
import MyInfo from './myinfo/MyInfo';
import Result from './result/Result';
import DeletePage from '../deleteAccount/DeletePage';

export default function Mypage() {
  const tabList = {
    0: <MyInfo />,
    1: <Result />,
    2: <DeletePage />,
  };
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = tabIndex => {
    setActiveTab(tabIndex);
  };
  return (
    <div>
      <MypageHeader />
      <S.Body>
        <S.TabBox>
          <ul>
            <S.TabList
              className={`${
                activeTab === 0 ? 'bg-brand text-white' : 'bg-slate-300'
              }`}
              onClick={() => changeTab(0)}
            >
              정보 수정
            </S.TabList>
            <S.TabList
              className={`${
                activeTab === 1 ? 'bg-brand text-white' : 'bg-slate-300'
              }`}
              onClick={() => changeTab(1)}
            >
              결과 보기
            </S.TabList>
            <S.TabList
              className={`${
                activeTab === 2 ? 'bg-brand text-white' : 'bg-slate-300'
              }`}
              onClick={() => changeTab(2)}
            >
              회원 탈퇴
            </S.TabList>
          </ul>
        </S.TabBox>
        <S.ContentBox>{tabList[activeTab]}</S.ContentBox>
      </S.Body>
    </div>
  );
}
const S = {
  Body: styled.div`
    ${tw`flex mt-10 max-w-7xl mx-auto`}
  `,
  TabBox: styled.div`
    ${tw`flex justify-end w-96`}
  `,
  TabList: styled.li`
    ${tw`hover:cursor-pointer m-5 p-3 w-32 rounded-xl font-cafe24 text-xl text-center`}
  `,
  ContentBox: styled.div`
    ${tw`w-full mr-20 m-5`}
  `,
};
