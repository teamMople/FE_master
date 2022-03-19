import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper } from 'components/atoms';
import UserVideoComponent from './UserVideoComponent';
import { useDispatch, useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import {
  setRemoteHandsUpStatus,
  setRemotePermissionStatus,
  setRoomInfo,
  setRoomSubscribers,
} from '../../modules/voiceChat';
// import Chat from './Chat';
// import ChatRoom from '../Chat/ChatRoom';
// import UserModel from '../models/user-model';

//!Todo 강제 음소거 되었을 시 '저요' 활성화 되도록
//!Todo '그래 말해보거라' 허용해줬을 때 참여자별로 '그래 말해보걸' 비활성화

const LiveRoom = () => {
  const [disconnect, setDisconnect] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subscribersState, setSubscribersState] = useState([]);
  const [publisher, setPublisher] = useState(undefined);
  const [myMicStatus, setMyMicStatus] = useState(false);
  const [isHandsUp, setIsHandsUp] = useState(false);
  const [remoteMicStatus, setRemoteMicStatus] = useState({
    remoteTarget: undefined,
    isAudioActive: undefined,
  });
  const remoteHandsUpStatus = useSelector(
    (state) => state.rooms.room.remoteHandsUpStatus,
  );
  const remotePermissionStatus = useSelector(
    (state) => state.rooms.room.remotePermissionStatus,
  );

  const [session, setSession] = useState(new OpenVidu().initSession());

  const roomSubscribers = useSelector((state) => state.rooms.room.subscribers);
  //
  // console.log('🙉 🙉roomInfo : ', roomInfo);
  // console.log('🙉 🙉roomSubscribers : ', roomSubscribers);

  // socket url
  const sockUrl = 'http://localhost:8080/api/ws-stomp';

  // 방 ID
  const roomId = location.state.roomId;
  const roomName = location.state.roomName;
  const role = location.state.role;
  const maxParticipantCount = location.state.maxParticipantCount;

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    return window.removeEventListener('beforeunload', onbeforeunload);
  }, []);

  useEffect(() => {
    joinSession();
    // return leaveSession();
  }, []);

  // let mySession = undefined;
  let OV = new OpenVidu();
  //=====================
  function onbeforeunload(event) {
    leaveSession();
  }
  function leaveSession() {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    OV = null;
    setSession(undefined);
    setSubscribersState([]);
    // setMySessionId('SessionA');
    // setMyUserName('Participant' + Math.floor(Math.random() * 100));
    // setLocalUser(undefined);
  }

  const joinSession = () => {
    subscribeToStreamCreated();
    connectToSession();
  };

  const subscribeToStreamCreated = () => {
    const mySession = session;
    if (mySession) {
      mySession.on('streamCreated', (event) => {
        let subscriber = mySession.subscribe(event.stream, undefined);
        let subscribers = subscribersState;
        subscribers.push(subscriber);
        setSubscribersState(subscribers);

        // 전역으로 관리하지 않으면 갱신된 정보를 시각적으로 받아 볼 수 없다!!!! 으아!!!!! 짜증나!!!!
        dispatch(setRoomSubscribers(subscriber));
      });
    }
  };
  const connectToSession = () => {
    getToken()
      .then((token) => {
        console.log(token);
        connect(token);
      })
      .catch((error) => {
        console.log(
          'There was an error getting the token:',
          error.code,
          error.message,
        );
        alert(`There was an error getting the token: ${error.message}`);
      });
  };

  const connect = (token) => {
    const mySession = session;
    mySession
      .connect(
        token,
        // { clientData: this.state.myUserName },
      )
      .then(() => {
        connectVoice();
      })
      .catch((error) => {
        alert(`There was an error connecting to the session: ${error.message}`);
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message,
        );
      });
  };

  const connectVoice = async () => {
    const devices = await OV.getDevices();
    const videoDevices = devices.filter((device) => {
      return device.kind === 'videoinput';
    });
    const audioDevices = devices.filter((device) => {
      return device.kind === 'audioinput';
    });
    let initPublisher = OV.initPublisher(undefined, {
      audioSource: role === 'PUBLISHER' ? true : audioDevices[0].deviceId, // The source of audio. If undefined default microphone
      videoSource: role === 'PUBLISHER' ? false : videoDevices[1].deviceId, // The source of video. If undefined default webcam
      publishAudio: role === 'PUBLISHER' ? false : true, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: role === 'PUBLISHER' ? false : true, // Whether you want to start publishing with your video enabled or not
      resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    });

    await session.publish(initPublisher);
    await setPublisher(initPublisher);

    dispatch(
      setRoomInfo({
        publisher: initPublisher,
      }),
    );
  };

  const getToken = async () => {
    const data = {
      roomId: roomId,
      memberName: 'Participant' + Math.floor(Math.random() * 100),
      role: role,
      participantCount: maxParticipantCount,
    };
    return await axios
      //!Todo auth/api/openvidu/getToken 로 추후에 변경해야 함
      .post(`http://localhost:8080/api/audio/join`, data)
      .then((res) => {
        console.log('😽', res.data);
        return res.data.token;
      })
      .catch((err) => console.log(err));
  };
  //=====================

  const leaveRoom = () => {
    leaveSession();
    navigate('/room', { replace: true });
  };

  // 마이크 상태가 변할 때 메세지를 보낸다
  const sendChangeMicStatus = () => {
    const mySession = session;
    console.log('mute publisher::::: ', publisher);
    setMyMicStatus(!myMicStatus);
    publisher.publishAudio(myMicStatus);
    const signalOptions = {
      data: JSON.stringify({ isAudioActive: myMicStatus }),
      type: 'userChanged',
    };
    mySession
      .signal(signalOptions)
      .then(() => console.log('마이크 상태가 정상적으로 전송되었습니다!'))
      .catch((error) => console.error(error));
    // try {
    //   const devices = await OV.getDevices();
    //
    //   let newPublisher = OV.initPublisher(undefined, {
    //     videoSource: false,
    //     audioSource: true,
    //     publishVideo: false,
    //     publishAudio: false,
    //   });
    //
    //   const oldPublisher = publisher;
    //
    //   await session.unpublish(oldPublisher);
    //   await session.publish(newPublisher);
    //
    //   setPublisher(newPublisher);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    receiveMicStatus();
  }, []);

  // 마이크 상태가 변하면 메세지를 받는다.
  const receiveMicStatus = () => {
    const mySession = session;
    mySession.on('signal:userChanged', (event) => {
      const isAudioActive = JSON.parse(event.data).isAudioActive;
      const remoteTarget = event.from.connectionId;
      setRemoteMicStatus({
        remoteTarget: remoteTarget,
        isAudioActive: isAudioActive,
      });
      console.log('마이크 상태를 정상적으로 전송 받았습니다!');
    });
  };

  // 방장이 강제로 구독자 권한 박탈할 때
  const sendForceMute = (sub) => {
    // --- 아래의 코드는 강제 unpublish 임. 적절치 않다는 걸 깨달음 21.03.19
    // console.log('streamId:::::', stream);
    // const mySession = session;
    // mySession
    //   .forceUnpublish(stream)
    //   .then(() => console.log('강제 언퍼블리싱 성공!!'))
    //   .catch((error) => console.error(error));
    // -----------

    const mySession = session;
    const requester = sub.stream.connection.connectionId;
    const options = {
      data: JSON.stringify({ forceMute: true, requester: requester }),
      type: 'forceMute',
    };
    mySession
      .signal(options)
      .then(() =>
        console.log('참여자에 대한 강제 음소거 메시지가 전송되었습니다!'),
      )
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    receiveForceMute();
  }, [publisher]);
  const receiveForceMute = () => {
    const mySession = session;
    mySession.on('signal:forceMute', (event) => {
      const data = JSON.parse(event.data);
      const remoteTarget = event.from.connectionId;
      console.log(
        '참여자에 대한 강제 음소거 메시지를 받았습니다!',
        data,
        remoteTarget,
      );
      if (
        publisher &&
        data.requester === publisher.session.connection.connectionId
      ) {
        publisher.publishAudio(false);
      }
    });
  };

  useEffect(() => {
    receiveHandsUp();
  }, [publisher]);

  // 발언권을 요청할 때
  const sendHandsUp = () => {
    const mySession = session;
    const handsUpOptions = {
      data: JSON.stringify({ isHandsUp: true }),
      type: 'handsUp',
    };
    mySession
      .signal(handsUpOptions)
      .then(() => console.log('발언하고 싶다고 전송되었습니다!'))
      .catch((error) => console.error(error));
    // setIsHandsUp(true);
    console.log('remoteHandsUpStatus :: ', remoteHandsUpStatus);
    console.log('퍼블리셔 핸즈업 :: ', publisher);
  };

  // 발언권 요청자를 받을 때
  const receiveHandsUp = () => {
    const mySession = session;
    mySession.on('signal:handsUp', (event) => {
      const data = JSON.parse(event.data).isHandsUp;
      const remoteTarget = event.from.connectionId;
      // setRemoteHandsUpStatus([
      //   ...remoteHandsUpStatus,
      //   {
      //     remoteTarget: remoteTarget,
      //     isHandsUp: data,
      //   },
      // ]);

      // 전역에서 관리해야 발언권 요청자 모두를 보여줄 수 있다.
      dispatch(
        setRemoteHandsUpStatus({
          remoteTarget: remoteTarget,
          isHandsUp: data,
        }),
      );

      console.log('발언 요청을 받았습니다!');
      console.log('퍼블리셔 핸즈업 리시브 :: ', publisher);
    });
  };

  // 발언권을 요청한 요청자와 구독자가 일치하는지 판단
  const remoteTarget = (sub) => {
    const val = remoteHandsUpStatus.filter(
      (item) => item.remoteTarget === sub.stream.connection.connectionId,
    );
    if (val.length > 0) {
      return val[0].remoteTarget;
    }
  };

  // 발언권을 요청한 요청자에게 발언을 허가해줬을 때 발언을 허가 해줬는지 판단
  const remoteTargetPermissionStatus = (sub) => {
    const val = remotePermissionStatus.filter(
      (item) => item.remoteTarget === sub.stream.connection.connectionId,
    );
    if (val.length > 0) {
      return val[0].permitSpeaking;
    }
  };

  // 인자의 role 이 MODERATOR 인지 확인
  const isModerator = (target) => {
    return target.session.openvidu.role === 'MODERATOR';
  };

  // 인자의 role 이 PUBLISHER 인지 확인
  const isPublisher = (target) => {
    return target.session.openvidu.role === 'PUBLISHER';
  };

  // 인자의 connectionId 반환
  const isPublisherId = (target) => {
    return target.session.connection.connectionId;
  };

  // 발언권 부여 메시지
  const sendPermitSpeaking = (sub) => {
    const mySession = session;
    const requester = sub.stream.connection.connectionId;
    const options = {
      data: JSON.stringify({ permission: true, requester: requester }),
      type: 'speaking',
    };
    mySession
      .signal(options)
      .then(() => console.log('발언 요청에 대한 허가를 전송하였습니다!'))
      .catch((error) => console.error(error));
    dispatch(
      setRemotePermissionStatus({
        remoteTarget: requester,
        permitSpeaking: true,
      }),
    );
  };

  // deps 에 publisher 를 넣어놓은 이유는 메시지를 받을 때는 항상 publisher 가 초기화된다. 메시지 보낼 때 같이 보내줘야하는데 보내는 것 자체가 불가능한 것 같다.
  // deps 에 넣어주면 처음에는 못 받아오지만 한번 더 렌더링 되면서 받아온다.. 이유는 모르겠다.. 어디서 publisher 가 변한다고 감지하는지 모르겠다..
  useEffect(() => {
    receivePermitSpeaking();
  }, [publisher]);

  // 발언권 부여 수락 메시지
  const receivePermitSpeaking = () => {
    const mySession = session;
    mySession.on('signal:speaking', (event) => {
      const data = JSON.parse(event.data);
      const connectionId = event.target.connection.connectionId;
      const remoteTarget = event.from.connectionId;
      console.log('발언 요청에 대한 허가가 떨어졌습니다!', data, remoteTarget);
      console.log('퍼블리셔...::', publisher);
      if (publisher && data.requester === isPublisherId(publisher)) {
        console.log('퍼블리셔와 리퀘스터가 똑같아!!');
        publisher.publishAudio(true);
      }
      if (publisher && publisher.stream.audioActive) {
        setIsHandsUp(true);
      }
    });
  };

  return (
    <>
      <Wrapper padding={'16px'}>
        {/* ---- 채팅방 ----*/}
        <div>실시간 채팅방</div>
        <p>방제 : {roomName}</p>
        {/*<p>방장 : {moderator}</p>*/}
        <p>역할 : {role}</p>
        <hr />

        <div
          id="video-container"
          className="col-md-6"
          style={{ display: 'flex' }}
        >
          {publisher && (
            <div
              className="stream-container col-md-6 col-xs-6"
              style={{ border: '1px solid red' }}
            >
              <div>{publisher.stream.connection.connectionId}</div>
              <img
                src={'/asset/image/userIcon.jpeg'}
                style={{ width: 30, height: 30 }}
              />
              <UserVideoComponent streamManager={publisher} />
              {isModerator(publisher) && (
                <>
                  <button onClick={sendChangeMicStatus}>음소거</button>
                  <div>
                    {publisher.stream.audioActive
                      ? '음소거 상태가 아닙니다.'
                      : '음소거 상태입니다.'}
                  </div>
                </>
              )}
              {isPublisher(publisher) && !isHandsUp && (
                <button onClick={sendHandsUp}>저요!!</button>
              )}
            </div>
          )}
          {roomSubscribers.map((sub, i) => (
            <div
              key={i}
              className="stream-container col-md-6 col-xs-6"
              style={{ border: '1px solid blue' }}
            >
              <div>{sub.stream.connection.connectionId}</div>
              <img
                src={'/asset/image/userIcon.jpeg'}
                style={{ width: 30, height: 30 }}
              />
              {sub.stream.connection.connectionId ===
                remoteMicStatus.remoteTarget && (
                <div>
                  {remoteMicStatus.isAudioActive
                    ? '마이크 활성화'
                    : '마이크 비활성화'}
                </div>
              )}
              <UserVideoComponent streamManager={sub} />

              {/* 방장이 강제로 구독자 권한 박탈 시킬 수 있음*/}
              {publisher && isModerator(publisher) && (
                <button onClick={() => sendForceMute(sub)}>닥쳐라 요놈!</button>
              )}

              {publisher &&
                isModerator(publisher) &&
                sub.stream.connection.connectionId === remoteTarget(sub) &&
                !remoteTargetPermissionStatus(sub) && (
                  <button onClick={() => sendPermitSpeaking(sub)}>
                    그래 말해보거라
                  </button>
                )}
            </div>
          ))}
        </div>

        <button onClick={leaveRoom}>방 나가기</button>
      </Wrapper>

      {/*!!Todo subscriber로 들어오면 어떻게 할 지??? */}
      {/*{publisher && (*/}
      {/*  <ChatRoom*/}
      {/*    roomId={roomId}*/}
      {/*    sockUrl={sockUrl}*/}
      {/*    userId={publisher.session.connection.data}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
};

const UserImageWrapper = styled.div`
  border-radius: 10em;
  width: 50px;
  overflow: hidden;

  img {
    width: inherit;
    object-fit: cover;
  }
`;

export default LiveRoom;
