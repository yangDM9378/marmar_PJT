/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import MypageManageComponent from '../../components/mypage/therapist/manage/MypageManageComponent';
import MyInfoComponent from '../../components/mypage/therapist/myinfo/MyInfoComponent';
import MypageHeader from '../../components/mypage/therapist/MypageHeader';

export default function TherapistMypage() {
  const tabList = {
    0: <MypageManageComponent />,
    1: <MyInfoComponent />,
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
              className={`${activeTab === 0 ? 'bg-brand text-white' : ''}`}
              onClick={() => changeTab(0)}
            >
              학생 관리
            </S.TabList>
            <S.TabList
              className={`${activeTab === 1 ? 'bg-brand text-white' : ''}`}
              onClick={() => changeTab(1)}
            >
              내 정보 수정
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
    ${tw`p-20 w-96 border-4 border-black m-5`}
  `,
  TabList: styled.li`
    ${tw`hover:cursor-pointer border-4 border-black m-5 p-3 w-32`}
  `,
  ContentBox: styled.div`
    ${tw`w-full mr-20 border-4 border-black m-5`}
  `,
};
