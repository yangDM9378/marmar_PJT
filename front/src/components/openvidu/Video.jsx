/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'twin.macro';
import React, { Component } from 'react';
import UserVideoComponent from './UserVideoComponent';
import ClassSection from './ClassSection';
import VideoModal from './VideoModal';
import SelectStudent from './makeroom/SelectStudent';
import { therapistCheckApi } from '../../api/userApi';
import { closeRoomApi, makeRoomApi } from '../../api/liveClassApi';

const APPLICATION_SERVER_URL = 'http://i8c204.p.ssafy.io/api/v1/openvidu/';

class Video extends Component {
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
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
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

  getStudentNum = num => {
    console.log(num);
    return this.setState({ studentNum: num });
  };

  async componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    if (localStorage.getItem('therapist')) {
      const res = await therapistCheckApi();
      await this.setState({
        mySessionId: res.therapistId,
        myUserName: res.therapistName,
      });
    }
    // } else if (localStorage.getItem('student')) {
    //   const res = await studentCheckApi();
    //   await this.setState({
    //     mySessionId: res.studentId,
    //     myUserName: res.studentName,
    //     isStudent: true,
    //   });
    //   await this.joinSession();
    //   await this.openModal();
    // }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  enableProdMode() {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
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

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        if (!this.state.isStudent) {
          makeRoomApi({ studentNum: this.state.studentNum });
        }
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
                resolution: '100%x100%', // The resolution of your video
                frameRate: 20, // The frame rate of your video
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

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;
    closeRoomApi(this.state.studentNum);
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
    const { mySessionId } = this.state;
    const { myUserName } = this.state;

    return (
      <div className="w-full bg-brand flex justify-center">
        {this.state.session === undefined && this.state.isStudent === false ? (
          <div
            id="join"
            className="w-[70%] h-[500px] my-auto bg-white rounded-2xl p-10"
          >
            <div className="text-3xl font-cafe24 text-center">
              수업 시작하기
            </div>
            <div id="join-dialog" className="space-y-3">
              <form className="form-group" onSubmit={this.joinSession}>
                <SelectStudent getStudentNum={this.getStudentNum} />
                <p className="text-center my-2">
                  <label>Participant: </label>
                  <input
                    className="border-2 border-black"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p className="text-center my-2">
                  <label> Session: </label>
                  <input
                    className="border-2 border-black"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="border-2 p-3 cursor-pointer border-black rounded-lg"
                    name="commit"
                    type="submit"
                    value="JOIN"
                    onClick={this.openModal}
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}
        {this.state.session !== undefined ? (
          <VideoModal open={this.state.modalOpen}>
            <S.LiveContainer className="bg-video-bg min-h-screen">
              <S.VideoSection>
                {this.state.mainStreamManager !== undefined ? (
                  <S.MyVideo>
                    <UserVideoComponent
                      streamManager={this.state.mainStreamManager}
                    />
                    <div className="absolute top-0 right-0 space-x-3 pr-2">
                      <button
                        type="button"
                        className="bg-white"
                        onClick={() => {
                          this.state.publisher.publishAudio(
                            !this.state.audiostate,
                          );
                          this.setState({ audiostate: !this.state.audiostate });
                        }}
                      >
                        음소거
                      </button>
                      <button
                        type="button"
                        className="bg-white"
                        onClick={() => {
                          this.state.publisher.publishVideo(
                            !this.state.videostate,
                          );
                          this.setState({ videostate: !this.state.videostate });
                        }}
                      >
                        비디오
                      </button>
                    </div>
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
                className="cols-2"
                close={(this.closeModal, this.leaveSession)}
                sessionId={mySessionId}
                streamManager={this.state.publisher}
              />
            </S.LiveContainer>
          </VideoModal>
        ) : null}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
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

export default Video;

const S = {
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
  UserVideo: styled.div`
    ${tw`relative border-4 border-red-400 h-[45%]`}
  `,
};
