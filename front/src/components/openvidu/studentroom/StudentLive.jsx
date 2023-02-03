/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'twin.macro';
import { OpenViduLoggerConfiguration } from 'openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLoggerConfiguration';
import { studentCheckApi } from '../../../api/userApi';
import ClassSection from '../ClassSection';
import UserVideoComponent from '../UserVideoComponent';
import VideoModal from '../VideoModal';
import { getTeacherApi } from '../../../api/liveClassApi';
// eslint-disable-next-line react/prefer-stateless-function

const APPLICATION_SERVER_URL = 'http://localhost:8080/api/v1/openvidu/';

export default class StudentLive extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: '',
      myUserName: ``,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      studentNum: 0,
      isStudent: false,
      // 모달창 열기
      modalOpen: false,
    };
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  // 모달 시작
  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  // 모달 끝
  async componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    if (localStorage.getItem('student')) {
      const res = await studentCheckApi();
      const teacher = await getTeacherApi();
      await this.setState({
        mySessionId: teacher.data,
        myUserName: res.studentName,
        isStudent: true,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload() {
    this.leaveSession();
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    const { subscribers } = this.state;
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();
    this.openModal();
    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        const mySession = this.state.session;
        // console.log(this.state);
        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', event => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          const subscriber = mySession.subscribe(event.stream, undefined);
          const { subscribers } = this.state;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers,
          });
          console.log(subscribers);
        });
        // On every Stream destroyed...
        mySession.on('streamDestroyed', event => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', exception => {
          // console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then(token => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, {
              clientData: this.state.myUserName,
            })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              const publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              const devices = await this.OV.getDevices();
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

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice,
                mainStreamManager: publisher,
                publisher,
              });

              console.log(this.state.subscribers);
            })
            .catch(error => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message,
              );
            });
        });
      },
    );
  }

  enableProdMode() {
    OpenViduLoggerConfiguration.disabled();
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: '',
      myUserName: ``,
      mainStreamManager: undefined,
      publisher: undefined,
      studentNum: 0,
      isStudent: false,
    });
  }

  render() {
    return (
      <S.PageContainer>
        {this.state.session === undefined ? (
          <S.WaitRoom>
            <S.StartBtn
              type="button"
              onClick={() => {
                this.joinSession();
              }}
            >
              입장하기
            </S.StartBtn>
          </S.WaitRoom>
        ) : null}
        {this.state.session !== undefined ? (
          <VideoModal open={this.state.modalOpen}>
            <S.LiveContainer>
              <S.VideoSection>
                {this.state.mainStreamManager !== undefined ? (
                  <S.MyVideo>
                    <UserVideoComponent
                      streamManager={this.state.mainStreamManager}
                    />
                  </S.MyVideo>
                ) : null}
                <S.UserVideo>
                  <div
                    className="h-[100%]"
                    onClick={() =>
                      this.handleMainVideoStream(this.state.subscribers[0])
                    }
                  >
                    <UserVideoComponent
                      streamManager={this.state.subscribers[0]}
                    />
                  </div>
                </S.UserVideo>
              </S.VideoSection>
              <ClassSection
                className="grid cols-2"
                close={(this.closeModal, this.leaveSession)}
                sessionId={this.state.mySessionId}
                streamManager={this.state.publisher}
              />
            </S.LiveContainer>
          </VideoModal>
        ) : null}
      </S.PageContainer>
    );
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
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
  }

  async createToken(sessionId) {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The token
  }
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
    ${tw`grid grid-cols-3 w-full max-h-full bg-videobg bg-cover`}
  `,
  VideoSection: styled.div`
    ${tw`grid-cols-1 flex flex-col max-h-screen justify-around border-4 border-black m-5 p-5`}
  `,
  MyVideo: styled.div`
    ${tw`relative border-4 border-blue-600 h-[45%]`}
  `,
  UserVideo: styled.div`
    ${tw`relative border-4 border-red-400 h-[45%]`}
  `,
};
