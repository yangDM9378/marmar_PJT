/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useContext } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FaCheck } from 'react-icons/fa';
import { SttContext } from '../../context/SttContext';
import { socket, SocketContext } from '../../context/SocketContext';

export default function PictureGame({
  answer,
  num,
  pictureOne,
  pictureTwo,
  pictureThree,
  pictureFour,
}) {
  const { isCheckArr, setIsCheckArr } = useContext(SttContext);
  const { pictureClickAnswer } = useContext(SocketContext);

  const check = e => {
    console.log(e);
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
  const correctCheck = e => {
    console.log(isCheckArr);
    if (isCheckArr.toString() === [false, false, false, false].toString()) {
      return alert('답을 눌러주세요');
    } else if (isCheckArr[answer] === true) {
      // setIsCheckArr([false, false, false, false]);
      return alert('정답임');
    } else {
      // setIsCheckArr([false, false, false, false]);
      return alert('정답아님');
    }
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
      <S.correctBtn>
        <S.Btn type="button" onClick={correctCheck}>
          정답확인
        </S.Btn>
      </S.correctBtn>
    </S.gameSection>
  );
}

const S = {
  gameSection: styled.div`
    ${tw`flex-col `}
  `,
  gameBody: styled.div`
    ${tw`flex place-content-around `}
  `,
  gameCard: styled.div`
    ${tw`relative  bg-white rounded-3xl m-5`}
  `,
  gameImg: styled.img`
    ${tw`relative`}
    width: 300px;
    height: 300px;
  `,
  gameIcon: styled.div`
    ${tw`absolute`}
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .Icon {
      font-size: 5rem;
      color: #ff385c;
    }
  `,
  correctBtn: styled.div`
    ${tw`flex justify-center h-20 `}
  `,
  Btn: styled.button`
    ${tw`text-3xl text-white`}
  `,
};
