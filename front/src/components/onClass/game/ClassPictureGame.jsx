/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FaCheck } from 'react-icons/fa';
import { SttContext } from '../../../context/SttContext';
import { socket, SocketContext } from '../../../context/SocketContext';

export default function ClassPictureGame({
  answer,
  num,
  pictureOne,
  pictureTwo,
  pictureThree,
  pictureFour,
}) {
  const { isCheckArr, setIsCheckArr } = useContext(SttContext);
  const { pictureClickAnswer } = useContext(SocketContext);
  // 체크된값 초기화 시키기
  useEffect(() => {
    setIsCheckArr([false, false, false, false]);
  }, []);

  const check = e => {
    // console.log(e);
    const updateArr = isCheckArr?.map((item, idx) => {
      if (idx === Number(e)) {
        return !item;
      } else {
        return false;
      }
    });
    setIsCheckArr(updateArr);
    pictureClickAnswer(updateArr); // socket_emit
  };

  socket.on('pictureClickAnswer', data => {
    setIsCheckArr(data);
  });

  return (
    <S.gameSection>
      <S.gameBody>
        <S.gameCard>
          <S.gameImg src={pictureOne} onClick={() => check(0)} />
          {isCheckArr[0] && (
            <S.gameIcon onClick={() => check(0)}>
              <FaCheck className="Icon" />
            </S.gameIcon>
          )}
        </S.gameCard>
        <S.gameCard>
          <S.gameImg src={pictureTwo} onClick={() => check(1)} />
          {isCheckArr[1] && (
            <S.gameIcon onClick={() => check(1)}>
              <FaCheck className="Icon" />
            </S.gameIcon>
          )}
        </S.gameCard>
      </S.gameBody>
      <S.gameBody>
        <S.gameCard>
          <S.gameImg src={pictureThree} onClick={() => check(2)} />
          {isCheckArr[2] && (
            <S.gameIcon onClick={() => check(2)}>
              <FaCheck className="Icon" />
            </S.gameIcon>
          )}
        </S.gameCard>
        <S.gameCard>
          <S.gameImg src={pictureFour} onClick={() => check(3)} />
          {isCheckArr[3] && (
            <S.gameIcon onClick={() => check(3)}>
              <FaCheck className="Icon" />
            </S.gameIcon>
          )}
        </S.gameCard>
      </S.gameBody>
    </S.gameSection>
  );
}

const S = {
  gameSection: styled.div`
    ${tw`flex-col max-h-full`}
  `,
  gameBody: styled.div`
    ${tw`flex place-content-around max-h-[30vh]`}
  `,
  gameCard: styled.div`
    ${tw`relative rounded-3xl m-5 max-h-[25%] bg-white`}
  `,
  gameImg: styled.img`
    ${tw`relative border-8 border-brand rounded-xl w-full h-full`}
  `,
  gameIcon: styled.div`
    ${tw`absolute`}
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .Icon {
      font-size: 180px;
      color: #ff385c;
    }
  `,
  correctBtn: styled.div`
    ${tw`flex justify-center mt-[20px]`}
  `,
  Btn: styled.button`
    ${tw`text-3xl text-white w-[170px] h-[100px] font-bold bg-brand rounded-2xl`}
  `,
};
