/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import MypageHeader from '../../components/mypage/MypageHeader';
import MyInfoComponent from '../../components/mypage/therapist/myinfo/MyInfoComponent';
import MypageStudentList from '../../components/mypage/therapist/manage/MypageStudentList';
import DeletePage from '../../components/mypage/deleteAccount/DeletePage';

export default function TherapistMypage() {
  const tabList = {
    0: <MypageStudentList />,
    1: <MyInfoComponent />,
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
                activeTab === 0
                  ? 'bg-brandHover  text-white font-bold text-[20px]'
                  : 'bg-gray-300 text-gray-60 text-[20px]'
              }`}
              onClick={() => changeTab(0)}
            >
              학생 관리
            </S.TabList>
            <S.TabList
              className={`${
                activeTab === 1
                  ? 'bg-brandHover  text-white font-bold text-[20px]'
                  : 'bg-gray-300 text-gray-600 text-[20px]'
              }`}
              onClick={() => changeTab(1)}
            >
              내 정보 수정
            </S.TabList>
            <S.TabList
              className={`${
                activeTab === 2
                  ? 'bg-brandHover  text-white font-bold text-[20px]'
                  : 'bg-gray-300 text-gray-600 text-[20px]'
              }`}
              onClick={() => changeTab(2)}
            >
              회원탈퇴
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
    ${tw`flex`}
  `,
  TabBox: styled.div`
    ${tw`ml-60 mt-20`}
  `,
  TabList: styled.li`
    ${tw`hover:cursor-pointer  ml-5 mb-5 mt-5 m-5 p-3 w-48 text-center rounded-xl `}
  `,
  ContentBox: styled.div`
    ${tw`mr-96 w-full m-5 `}
  `,
};
