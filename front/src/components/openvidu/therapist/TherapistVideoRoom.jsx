/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { closeRoomApi, makeRoomApi } from '../../../api/liveClassApi';
import VideoModal from '../VideoModal';
import UserVideoComponent from '../UserVideoComponent';
import ClassSection from '../ClassSection';
import SelectStudent from '../makeroom/SelectStudent';
import useAuth from '../../../hooks/queries/useAuth';

const APPLICATION_SERVER_URL = 'https://i8c204.p.ssafy.io/api/v1/openvidu/';

export default function TherapistVideoRoom() {
  const { useTherapistCheck } = useAuth();
  const { data: therapist } = useTherapistCheck();
  const navigate = useNavigate();

  const [mySessionId, setMySessionId] = useState('');
  const [myUserName, setMyUserName] = useState('');
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [studentNum, setStudentNum] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);

  // eslint-disable-next-line prefer-const, no-undef-init
  let OV = undefined;

  // 토큰 받아오기
  const getToken = useCallback(() => {
    return createSession(mySessionId).then(sessionId => createToken(sessionId));
  }, [mySessionId]);

  // 세션 생성
  const createSession = sessionId => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(`${APPLICATION_SERVER_URL}api/sessions`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('CREATE SESSION', response);
          resolve(response.data);
        })
        .catch(response => {
          const error = { ...response };
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${APPLICATION_SERVER_URL}`,
            );
            if (
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at "${APPLICATION_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
                  `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${APPLICATION_SERVER_URL}"`,
              )
            ) {
              window.location.assign(
                `${APPLICATION_SERVER_URL}/openvidu/accept-certificate`,
              ); // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  };

  const createToken = sessionId => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
          {},
          {
            headers: {
              // Authorization: `Basic ${btoa(
              //   `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
              // )}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log('TOKEN', response.data);
          resolve(response.data);
        })
        .catch(error => reject(error));
    });
  };

  // 모달
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const setStudent = data => {
    setStudentNum(data);
  };

  // 세션 아이디 설정
  useEffect(() => {
    async function fetch() {
      await leaveSession();
      await setMySessionId(therapist?.therapistId);
      await setMyUserName(therapist?.therapistName);
    }
    // async function fetch() {
    //   if (localStorage.getItem('therapist')) {
    //     const res = await therapistCheckApi();
    //     await setMySessionId(res.therapistId);
    //     await setMyUserName(res.therapistName);
    //   }
    // }
    fetch();
  }, []);

  // 세션 참여
  const joinSession = () => {
    console.log('오픈비두 시작');
    OV = new OpenVidu(); // --- 1) 오픈비두 오브젝트 생성 ---
    OV.enableProdMode(); // 콘솔 막기
    makeRoomApi({ studentNum });
    openModal();
    const mySession = OV.initSession(); // --- 2) 세션을 시작 --
    setSession(mySession);

    mySession.on('streamCreated', event => {
      // 스트림이 생길 때마다
      const subscriber = mySession.subscribe(event.stream, 'publisher'); // 퍼블리셔를 구독자로 넣어줌
      subscribers.push(subscriber);

      // Update the state with the new subscribers
      setSubscribers(subscribers);
    });

    mySession.on('streamDestroyed', event => {
      // 스트림을 종료할 때마다
      deleteSubscriber(event.stream.streamManager); // 참가자 배열에서 스트림 객체를 제거함
    });

    mySession.on('exception', exception => {
      // 예외 처리
      console.warn(exception);
    });

    // --- 4) 유효한 토큰으로 세션에 접속하기 ---
    getToken().then(token => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(
            device => device.kind === 'videoinput',
          );
          // --- 5) Get your own camera stream ---(퍼블리셔)
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '100%x100%', // The resolution of your video '450x720'
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });

          mySession.publish(publisher); // --- 6) 자신의 화면을 송출 ---
          setPublisher(publisher); // 퍼블리셔(스트림 객체)를 담음
          setMainStreamManager(publisher); // 퍼블리셔(스트림 객체)를 담음
        })
        .catch(error => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        });
    });
  };

  // 세선 떠나기 --- 7) disconnect함수를 호출하여 세션을 떠남
  const leaveSession = () => {
    const mySession = session;
    closeRoomApi(studentNum);
    if (mySession) {
      mySession.disconnect();
      navigate('/'); // 메인페이지로 이동
    }
    // 속성을 초기화함(필요한 속성은 초기화하면 안 됨)
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('');
    setMyUserName('');
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setStudentNum(0);
  };

  useEffect(() => {
    const onbeforeunload = event => {
      leaveSession();
    };
    window.addEventListener('beforeunload', onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, [leaveSession]);

  // 참가자를 배열에서 제거함
  const deleteSubscriber = useCallback(
    streamManager => {
      let tmpSubscribers = subscribers;
      let index = tmpSubscribers.indexOf(streamManager, 0);
      if (index > -1) {
        tmpSubscribers.splice(index, 1);
        setSubscribers(tmpSubscribers); // 이거 안 되면 구조분해할당으로 업데이트 할 것
      }
    },
    [subscribers],
  );

  const handleVideo = () => {
    publisher.publishVideo(!video);
    setVideo(!video);
  };
  const handleAudio = () => {
    publisher.publishAudio(!audio);
    setAudio(!audio);
  };

  return (
    <S.PageContainer>
      {session === undefined ? (
        <S.WaitRoom>
          <SelectStudent setStudent={setStudent} />
          <S.StartBtn type="button" onClick={joinSession}>
            입장하기
          </S.StartBtn>
        </S.WaitRoom>
      ) : null}
      {session !== undefined ? (
        <VideoModal open={modalOpen}>
          <S.LiveContainer className="min-h-screen bg-video-bg">
            <S.VideoSection>
              {mainStreamManager !== undefined ? (
                <S.MyVideo>
                  <UserVideoComponent streamManager={mainStreamManager} />
                  <S.HandleVideoBox>
                    <S.HandleVideoButton type="button" onClick={handleAudio}>
                      음소거
                    </S.HandleVideoButton>
                    <S.HandleVideoButton type="button" onClick={handleVideo}>
                      비디오
                    </S.HandleVideoButton>
                  </S.HandleVideoBox>
                </S.MyVideo>
              ) : null}
              {subscribers[0] && (
                <S.UserVideo>
                  <div className="h-[100%]">
                    <UserVideoComponent streamManager={subscribers[0]} />
                  </div>
                </S.UserVideo>
              )}
            </S.VideoSection>
            <div className="col-span-2">
              <ClassSection
                close={(closeModal, leaveSession)}
                sessionId={mySessionId}
                streamManager={publisher}
              />
            </div>
          </S.LiveContainer>
        </VideoModal>
      ) : null}
    </S.PageContainer>
  );
}

const S = {
  WaitRoom: styled.div`
    ${tw`h-full flex justify-center items-center min-h-screen`}
  `,
  StartBtn: styled.button`
    ${tw`border-4 border-black p-5`}
  `,
  PageContainer: styled.div`
    ${tw`w-full bg-brand flex justify-center`}
  `,
  LiveContainer: styled.div`
    ${tw`grid grid-cols-3 w-full max-h-full bg-cover`}
  `,
  VideoSection: styled.div`
    ${tw`grid-cols-1 flex flex-col max-h-screen justify-around border-4 border-black m-5 p-5`}
  `,
  MyVideo: styled.div`
    ${tw`relative border-4 border-blue-600 h-[45%]`}
  `,
  HandleVideoBox: styled.div`
    ${tw`absolute top-0 right-0 space-x-3 pr-2`}
  `,
  HandleVideoButton: styled.button`
    ${tw`bg-slate-300`}
  `,
  UserVideo: styled.div`
    ${tw`relative border-4 border-red-400 h-[45%]`}
  `,
};
