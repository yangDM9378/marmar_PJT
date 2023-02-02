/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-await */
import React, { useEffect, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'twin.macro';
import VideoModal from '../VideoModal';
import UserVideoComponent from '../UserVideoComponent';
import ClassSection from '../ClassSection';

const APPLICATION_SERVER_URL = 'http://localhost:8080/api/v1/openvidu/';

export default function StudentVideo() {
  const [roomState, setRoomState] = useState({
    mySessionId: 'temp',
    myUserName: `temp`,
    session: undefined,
    mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    publisher: undefined,
    subscribers: [],
    studentNum: 0,
    isStudent: false,
    // 모달창 열기
    modalOpen: false,
  });

  const openModal = () => {
    setRoomState({ modalOpen: true });
  };
  const closeModal = () => {
    setRoomState({ modalOpen: false });
  };
  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession();
    openModal();
    return () => window.removeEventListener('beforeunload', onbeforeunload);
  }, []);
  let OV;
  const onOV = () => {
    OV = new OpenVidu();
    console.log(OV);
  };
  const onbeforeunload = () => {
    leaveSession();
  };
  // const handleMainVideoStream = stream => {
  //   if (roomState.mainStreamManager !== stream) {
  //     setRoomState({ mainStreamManager: stream });
  //   }
  // };
  const joinSession = async () => {
    await onOV();
    await setRoomState({ session: OV.initSession() });
    const mySession = await roomState.session;

    await mySession.on('streamCreated', event => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      const subscriber = mySession.subscribe(event.stream, undefined);
      const { subscribers } = roomState;
      subscribers.push(subscriber);

      // Update the state with the new subscribers
      setRoomState({
        subscribers,
      });
    });
    await mySession.on('streamDestroyed', event => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });
    await mySession.on('exception', exception => {
      // console.warn(exception);
    });

    await getToken().then(token => {
      mySession
        .connect(token, {
          clientData: roomState.myUserName,
        })
        .then(async () => {
          const publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          mySession.publish(publisher);

          const devices = await OV.getDevices();
          const videoDevices = devices.filter(
            device => device.kind === 'videoinput',
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            device => device.deviceId === currentVideoDeviceId,
          );

          setRoomState({
            currentVideoDevice,
            mainStreamManager: publisher,
            publisher,
          });
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
  const deleteSubscriber = streamManager => {
    const { subscribers } = roomState;
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setRoomState({
        subscribers,
      });
    }
  };

  const leaveSession = () => {
    const mySession = roomState.session;
    if (mySession) {
      mySession.disconnect();
    }
    OV = null;
    setRoomState({
      session: undefined,
      subscribers: [],
      mySessionId: '',
      myUserName: ``,
      mainStreamManager: undefined,
      publisher: undefined,
      studentNum: 0,
      isStudent: false,
    });
  };

  const getToken = async () => {
    const sessionId = await createSession(roomState.mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async sessionId => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions`,
      { customSessionId: sessionId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // The sessionId
  };

  const createToken = async sessionId => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The token
  };
  return (
    <S.PageContainer>
      {roomState.session === undefined ? <div>loading</div> : null}
      {roomState.session !== undefined ? (
        <VideoModal open={roomState.modalOpen}>
          <S.LiveContainer>
            <S.VideoSection>
              {roomState.mainStreamManager !== undefined ? (
                <S.MyVideo>
                  <UserVideoComponent
                    streamManager={roomState.mainStreamManager}
                  />
                </S.MyVideo>
              ) : null}
            </S.VideoSection>
            <ClassSection
              className="cols-2"
              close={(closeModal, leaveSession)}
              sessionId={roomState.mySessionId}
              streamManager={roomState.publisher}
            />
          </S.LiveContainer>
        </VideoModal>
      ) : null}
    </S.PageContainer>
  );
}

const S = {
  PageContainer: styled.div`
    ${tw`w-full bg-brand flex justify-center`}
  `,
  LiveContainer: styled.div`
    ${tw`grid grid-cols-3 w-full h-[100vh] bg-video-bg bg-cover`}
  `,
  VideoSection: styled.div`
    ${tw`grid-cols-1 flex flex-col justify-around`}
  `,
  MyVideo: styled.div`
    ${tw`relative`}
  `,
};
