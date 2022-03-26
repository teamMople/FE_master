import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from 'components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import {
  closeRoomAsync,
  leaveRoomAsync,
  ovDeleteTokenAsync,
  ovGetTokenAsync,
  removeAllRoomSubscribers,
  removeRoomSubscriber,
  selectChatHideState,
  selectRoomState,
  setRemoteForceMuteStatus,
  setRemoteHandsUpStatus,
  setRemotePermissionStatus,
  setRoomSubscribers,
} from '../../modules/chat';
import TextChatView from './TextChatView';
import VoteView from './VoteView';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import ChatUserProfile from '../../components/molecules/ChatUserProfile';
import { Button, Divider, Grid, Header, StatusBox, Text } from 'components';
import { ChatUser, UserRoom } from './component';
import IconButton from '../../components/atoms/buttons/IconButton';

//!Todo 마이크 선택 가능하도록!!

const LiveRoom = () => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subscribersState, setSubscribersState] = useState([]);
  const [publisher, setPublisher] = useState(undefined);
  const [myMicStatus, setMyMicStatus] = useState(false);
  const [isHandsUp, setIsHandsUp] = useState(false);
  const [myMutMute, setMyMicMute] = useState(false);
  const [currentMic, setCurrentMic] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(false);
  const [remoteMicStatus, setRemoteMicStatus] = useState({
    remoteTarget: undefined,
    isAudioActive: undefined,
  });
  const remoteHandsUpStatus = useSelector(
    (state) => state.chats.room.remoteHandsUpStatus,
  );
  const remoteForceMuteStatus = useSelector(
    (state) => state.chats.room.remoteForceMuteStatus,
  );
  const remotePermissionStatus = useSelector(
    (state) => state.chats.room.remotePermissionStatus,
  );
  const roomSubscribers = useSelector((state) => state.chats.room.subscribers);
  const joinRoomStatus = useSelector(selectRoomState);
  const memberVoteStatus = useSelector((state) => state.chats.vote.voteStatus);

  const [OV, setOV] = useState(new OpenVidu());
  const [session, setSession] = useState(OV.initSession());
  console.log('joinRoomStatus :: ', joinRoomStatus);
  // Socket 초기화 - 여기서 초기화 해주고...
  let messageSock = new SockJS(process.env.REACT_APP_SOCKET_MESSAGE_URL);
  let voteSock = new SockJS(process.env.REACT_APP_SOCKET_VOTE_URL);
  let messageStomp = over(messageSock);
  let voteStomp = over(voteSock);

  const disconnectSocket = async (streamManager) => {
    let chatMessage = {
      sender: streamManager ? streamManager : joinRoomStatus.memberName,
      type: 'LEAVE',
      roomId: joinRoomStatus.roomId,
    };
    messageStomp.send('/pub/chat/message', {}, JSON.stringify(chatMessage));
    // await voteStomp.send('/pub/chat/vote', {}, JSON.stringify(chatMessage));
    await messageStomp.unsubscribe(joinRoomStatus.moderatorNickname);
    await voteStomp.unsubscribe();
    await messageStomp.disconnect(
      {},
      {
        memberName: joinRoomStatus.memberName,
      },
    );
    await voteStomp.disconnect({}, { memberName: joinRoomStatus.memberName });
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession().then((r) => r);
    console.log('useEffect useEffect useEffect useEffect useEffect');
    return () => window.removeEventListener('beforeunload', onbeforeunload);
  }, []);

  // 새로고침 혹은 브라우저 강제 종료할 경우 감지 함수
  const onbeforeunload = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.returnValue = '';
    if (joinRoomStatus.role !== 'MODERATOR') {
      // 흠.. 하나의 함수만 실행 가능한 것 같음. 두번째 함수부터는 실행이 안됨.
      await leaveRoom();
      // await navigate('/room', { replace: true });
    } else {
      await sendForceLeave();
      await leaveRoom();
    }
  };

  const leaveSession = () => {
    if (session !== null) {
      session.disconnect();
    }
    setPublisher(undefined);
    // dispatch(removeAllRoomSubscribers);
  };

  // MODERATOR 만 사용 가능한 함수
  const closeRoom = async () => {
    const data = {
      roomId: joinRoomStatus.roomId,
      memberName: joinRoomStatus.memberName,
      role: joinRoomStatus.role,
    };
    await dispatch(closeRoomAsync(data))
      .then(() => {
        //!Todo 주석 풀 것!
        // alert('방장 방 종료하기 성공!');
        roomSubscribers.forEach((sub) =>
          session.forceDisconnect(sub.stream.connection.connectionId),
        );
      })
      .catch(() => alert('방장 방 종료하기 실패!'));
  };
  useEffect(() => {
    if (joinRoomStatus.role !== 'MODERATOR') {
      receiveForceLeave();
    }
  }, []);
  // 방 종료 시 참여자들에게 메세지 보내기
  const sendForceLeave = async () => {
    const options = {
      data: JSON.stringify({ noModerator: true }),
      type: 'forceLeave',
    };
    await session
      .signal(options)
      .then(() => console.log('(SEND) 방장이 존재하지 않습니다!'))
      .catch((error) => console.error(error));
  };
  const receiveForceLeave = () => {
    if (session !== null && joinRoomStatus.role !== 'MODERATOR') {
      session.on('signal:forceLeave', (event) => {
        leaveRoom().then((r) => r);
        console.log('(RECEIVE) 방장이 존재하지 않습니다!');
      });
    }
    if (session !== null && joinRoomStatus.role === 'MODERATOR') {
      setTimeout(() => leaveRoom(), 3000);
    }
  };
  useEffect(() => {
    subscribeToStreamDestroyed();
  }, []);
  const subscribeToStreamDestroyed = () => {
    if (session) {
      session.on('streamDestroyed', (event) => {
        // Remove the stream from 'subscribers' array
        console.log('🏙 streamDestroyed: streamDestroyed!!');
        // disconnectSocket(event.stream.streamManager.stream.connection.data);
        deleteSubscriber(event.stream.streamManager);
      });
    }
  };
  const joinSession = async () => {
    await subscribeToStreamCreated();

    await session.on('exception', (exception) => {
      console.warn(exception);
    });
    await connectToSession();
    console.log('🔫 🔫 🔫 subscribersState: ', subscribersState);
  };

  const deleteSubscriber = (streamManager) => {
    console.log('🏠 roomSubscribers : ', roomSubscribers);
    console.log('🧲 streamManager : ', streamManager);
    dispatch(removeRoomSubscriber({ streamManager: streamManager }));
  };

  const subscribeToStreamCreated = () => {
    if (session !== null) {
      session.on('streamCreated', (event) => {
        let subscriber = session.subscribe(event.stream, undefined);
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
    session
      .connect(
        token,
        // { clientData: this.state.myUserName },
      )
      .then(() => {
        connectVoice().then((r) => r);
      })
      .catch((error) => {
        //!Todo 나중에 무조건 Alert 삭제해야함! 그래야 페이지 이동 바로됨!
        alert(`There was an error connecting to the session: ${error.message}`);
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message,
        );
        localStorage.removeItem('OVAccessToken');
        navigate('/room', { replace: true });
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
    console.log(audioDevices);
    let initPublisher = OV.initPublisher(undefined, {
      audioSource:
        joinRoomStatus.role === 'PUBLISHER' ? true : audioDevices[0].deviceId, // The source of audio. If undefined default microphone
      // videoSource:
      //   joinRoomStatus.role === 'PUBLISHER' ? false : videoDevices[1].deviceId, // The source of video. If undefined default webcam
      videoSource: false,
      publishAudio: joinRoomStatus.role !== 'PUBLISHER', // Whether you want to start publishing with your audio unmuted or not
      publishVideo: false, // Whether you want to start publishing with your video enabled or not
      resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    });

    // subscribeToStreamDestroyed();

    await session.publish(initPublisher);
    await setPublisher(initPublisher);
  };

  const getToken = async () => {
    const data = {
      roomId: joinRoomStatus.roomId,
      memberName: joinRoomStatus.memberName,
      role: joinRoomStatus.role,
      participantCount: joinRoomStatus.maxParticipantCount,
    };
    console.log('data', data);
    return await dispatch(ovGetTokenAsync(data))
      .then((res) => {
        localStorage.setItem('OVAccessToken', res.payload.data.token);
        console.log('res :::=======> ', res);
        return res.payload.data.token;
      })
      .catch((err) => console.error(err));
  };

  const leaveRoom = async () => {
    const data = {
      roomId: joinRoomStatus.roomId,
      memberName: joinRoomStatus.memberName,
      role: joinRoomStatus.role,
      agreed: memberVoteStatus.memberAgreed,
      disagreed: memberVoteStatus.memberDisagreed,
    };

    await dispatch(leaveRoomAsync(data)).then(() => deleteToken());
  };
  const deleteToken = async () => {
    const openviduData = {
      roomId: joinRoomStatus.roomId,
      memberName: joinRoomStatus.memberName,
      role: joinRoomStatus.role,
      token: localStorage.getItem('OVAccessToken'),
    };
    await dispatch(ovDeleteTokenAsync(openviduData))
      .then(async () => {
        //!Todo 주석 풀 것!
        // alert('퇴장 토큰 삭제 성공!');
        if (joinRoomStatus.role === 'MODERATOR') {
          // await sendForceLeave();
          await closeRoom();
        }
        await setUnsubscribe(true);
        // 1. 소켓 연결을 끊는다.
        await disconnectSocket();
        // 2. 전역에서 관리하고 있는 Subscribers 목록을 초기화한다.
        await dispatch(removeAllRoomSubscribers());
        // 3. session 연결을 끊는다.
        await leaveSession();
        // 4. 로컬 저장소에 저장한 openvidu token 을 제거한다.
        await localStorage.removeItem('OVAccessToken');
        // 5. 페이지를 이동시킨다.
        await navigate('/room', { replace: true });
      })
      .catch(() => alert('퇴장 토큰 삭제 실패!'));
  };

  // 마이크 상태가 변할 때 메세지를 보낸다
  const sendChangeMicStatus = () => {
    console.log('mute publisher::::: ', publisher);
    setMyMicStatus(!myMicStatus);
    publisher.publishAudio(myMicStatus);
    const signalOptions = {
      data: JSON.stringify({ isAudioActive: myMicStatus }),
      type: 'userChanged',
    };
    session
      .signal(signalOptions)
      .then(() => console.log('마이크 상태가 정상적으로 전송되었습니다!'))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    receiveMicStatus();
  }, []);

  // 마이크 상태가 변하면 메세지를 받는다.
  const receiveMicStatus = () => {
    if (session !== null) {
      session.on('signal:userChanged', (event) => {
        const isAudioActive = JSON.parse(event.data).isAudioActive;
        const remoteTarget = event.from.connectionId;
        setRemoteMicStatus({
          remoteTarget: remoteTarget,
          isAudioActive: isAudioActive,
        });
        console.log('마이크 상태를 정상적으로 전송 받았습니다!');
      });
    }
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

    const requester = sub.stream.connection.connectionId;
    const options = {
      data: JSON.stringify({ forceMute: true, requester: requester }),
      type: 'forceMute',
    };
    if (session !== null) {
      session
        .signal(options)
        .then(() => {
          console.log('참여자에 대한 강제 음소거 메시지가 전송되었습니다!');
        })
        .catch((error) => console.error(error));
      dispatch(
        setRemoteForceMuteStatus({
          remoteTarget: requester,
          forceMute: false,
        }),
      );
    }
  };
  useEffect(() => {
    receiveForceMute();
  }, [publisher]);
  const receiveForceMute = () => {
    if (session !== null) {
      session.on('signal:forceMute', (event) => {
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
        dispatch(
          setRemoteHandsUpStatus({
            remoteTarget: data.requester,
            isHandsUp: false,
          }),
        );
        setIsHandsUp(false);
        setMyMicMute(false);
      });
    }
  };

  useEffect(() => {
    receiveHandsUp();
  }, []);

  // 발언권을 요청할 때
  const sendHandsUp = (publisher) => {
    const requester = publisher.stream.connection.connectionId;
    console.log('🎊 🎊 requester::', requester);
    const handsUpOptions = {
      data: JSON.stringify({ requester: requester, isHandsUp: true }),
      type: 'handsUp',
    };
    session
      .signal(handsUpOptions)
      .then(() => console.log('발언하고 싶다고 전송되었습니다!'))
      .catch((error) => console.error(error));
    // setIsHandsUp(true);
    console.log('remoteHandsUpStatus :: ', remoteHandsUpStatus);
    console.log('퍼블리셔 핸즈업 :: ', publisher);
  };

  // 발언권 요청자를 받을 때
  const receiveHandsUp = () => {
    if (session !== null) {
      session.on('signal:handsUp', (event) => {
        const data = JSON.parse(event.data);
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
            remoteTarget: data.requester,
            isHandsUp: data.isHandsUp,
          }),
        );
        dispatch(
          setRemotePermissionStatus({
            remoteTarget: remoteTarget,
            permitSpeaking: false,
          }),
        );
        console.log('💎💎 remotePermissionStatus', remotePermissionStatus);
        console.log('발언 요청을 받았습니다!');
        // console.log('퍼블리셔 핸즈업 리시브 :: ', publisher);
      });
    }
  };

  // 발언권을 요청한 요청자와 구독자가 일치하는지 판단
  const remoteTarget = (sub) => {
    const val = remoteHandsUpStatus.filter(
      (item) => item.remoteTarget === sub.stream.connection.connectionId,
    );
    if (val.length > 0) {
      return val[val.length - 1].remoteTarget;
    }
  };
  const remoteTargetForceMuteStatus = (sub) => {
    const val = remoteForceMuteStatus.filter(
      (item) => item.remoteTarget === sub.stream.connection.connectionId,
    );
    if (val.length > 0) {
      return val[val.length - 1].forceMute;
    }
  };

  // 발언권을 요청한 요청자에게 발언을 허가해줬을 때 발언을 허가 해줬는지 판단
  const remoteTargetPermissionStatus = (sub) => {
    const val = remotePermissionStatus.filter(
      (item) => item.remoteTarget === sub.stream.connection.connectionId,
    );
    if (val.length > 0) {
      return val[val.length - 1].permitSpeaking;
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
    const requester = sub.stream.connection.connectionId;
    const options = {
      data: JSON.stringify({ permission: true, requester: requester }),
      type: 'speaking',
    };
    if (session !== null) {
      session
        .signal(options)
        .then(() => console.log('발언 요청에 대한 허가를 전송하였습니다!'))
        .catch((error) => console.error(error));
      dispatch(
        setRemotePermissionStatus({
          remoteTarget: requester,
          permitSpeaking: true,
        }),
      );
      dispatch(
        setRemoteForceMuteStatus({
          remoteTarget: requester,
          forceMute: true,
        }),
      );
    }
  };

  // deps 에 publisher 를 넣어놓은 이유는 메시지를 받을 때는 항상 publisher 가 초기화된다. 메시지 보낼 때 같이 보내줘야하는데 보내는 것 자체가 불가능한 것 같다.
  // deps 에 넣어주면 처음에는 못 받아오지만 한번 더 렌더링 되면서 받아온다.. 이유는 모르겠다.. 어디서 publisher 가 변한다고 감지하는지 모르겠다..
  useEffect(() => {
    receivePermitSpeaking();
  }, [publisher]);

  // 발언권 부여 수락 메시지
  const receivePermitSpeaking = () => {
    if (session !== null) {
      session.on('signal:speaking', (event) => {
        const data = JSON.parse(event.data);
        const remoteTarget = event.from.connectionId;
        console.log(
          '발언 요청에 대한 허가가 떨어졌습니다!',
          data,
          remoteTarget,
        );
        // console.log('퍼블리셔...::', publisher);
        if (publisher && data.requester === isPublisherId(publisher)) {
          console.log('퍼블리셔와 리퀘스터가 똑같아!!');
          publisher.publishAudio(true);
        }
        if (publisher && publisher.stream.audioActive) {
          setIsHandsUp(true);
          setMyMicMute(true);
        }
      });
    }
  };

  console.log('💌 roomSubscribers :', roomSubscribers);

  const [showUserRoom, setShowUserRoom] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const hideChatState = useSelector(selectChatHideState);
  const handleShowUserRoom = () => {
    setShowUserRoom(true);
  };
  const handleHideUserRoom = () => {
    setShowUserRoom(false);
  };
  const handleMoveChatRoom = () => {
    setShowUserRoom(false);
    setShowChatRoom(true);
  };
  const handleMoveUserRoom = () => {
    setShowUserRoom(true);
    setShowChatRoom(false);
  };
  const handleShowChatRoom = () => {
    setShowChatRoom(true);
  };
  const handleHideChatRoom = () => {
    setShowChatRoom(false);
  };

  return (
    <>
      <>
        <BackDrop className={(showUserRoom || showChatRoom) && 'active'} />
        <Button
          small
          shape={'rounded'}
          style={{ minWidth: 'auto', position: 'fixed', zIndex: 99 }}
          onClick={handleHideChatRoom}
        >
          채팅방 숨기기
        </Button>
        <RoomWrapper className={showUserRoom && 'active'}>
          <TopButtonGroup>
            <IconButton
              onClick={handleHideUserRoom}
              src={'/asset/icons/Down_arrow.svg'}
            />

            <Button
              style={{ minWidth: '30px' }}
              small
              shape={'rounded'}
              backgroundColor={themeContext.colors.lightGray}
              color={themeContext.colors.black}
              onClick={leaveRoom}
            >
              {publisher && isModerator(publisher)
                ? '방 종료하기'
                : '방 나기기'}
            </Button>
            {publisher && isModerator(publisher) && (
              <Button
                style={{ minWidth: '30px' }}
                small
                shape={'rounded'}
                backgroundColor={themeContext.colors.lightGray}
                color={themeContext.colors.black}
                onClick={sendForceLeave}
              >
                종료 메시지 전송
              </Button>
            )}
          </TopButtonGroup>
          <RoomInfoWrapper>
            <Text large semiBold>
              {joinRoomStatus.roomName}
            </Text>
            <StatusWrapperChat>
              <StatusBox
                icon={'/asset/icons/Join.svg'}
                count={5}
                backgroundColor={themeContext.colors.white}
              />
              <StatusBox
                label={'hosted by'}
                text={joinRoomStatus.moderatorNickname}
                gap={'3px'}
                backgroundColor={themeContext.colors.white}
              />
            </StatusWrapperChat>
          </RoomInfoWrapper>
          <InnerWrapper>
            {publisher && (
              <ChatUser
                streamManager={publisher}
                memberName={publisher.stream.connection.data}
                isMute={
                  (isModerator(publisher) ||
                    (isPublisher(publisher) && myMutMute)) &&
                  publisher.stream.audioActive
                }
              />
            )}
            {roomSubscribers.map((sub, i) => (
              <>
                <ChatUser
                  key={i}
                  streamManager={sub}
                  memberName={sub.stream.connection.data}
                  isMute={
                    sub.stream.connection.connectionId ===
                      remoteMicStatus.remoteTarget &&
                    remoteMicStatus.isAudioActive
                  }
                />
                {publisher &&
                  isModerator(publisher) &&
                  remoteTarget(sub) &&
                  remoteTargetForceMuteStatus(sub) && (
                    <button onClick={() => sendForceMute(sub)}>
                      강제음소거
                    </button>
                  )}
                {publisher &&
                  isModerator(publisher) &&
                  remoteTarget(sub) &&
                  !remoteTargetPermissionStatus(sub) && (
                    <button onClick={() => sendPermitSpeaking(sub)}>
                      수락하기
                    </button>
                  )}
              </>
            ))}
          </InnerWrapper>
          <BottomButtonGroup>
            <RoomInnerButton onClick={handleMoveChatRoom}>
              <img src={'/asset/icons/paper-plane.svg'} alt="icon" />
              <Text>채팅방</Text>
            </RoomInnerButton>

            {publisher &&
              (isModerator(publisher) ||
                (isPublisher(publisher) && myMutMute)) && (
                <div onClick={sendChangeMicStatus}>
                  {myMicStatus ? (
                    <img src={'/asset/icons/microphone.svg'} alt="icon" />
                  ) : (
                    <img
                      src={'/asset/icons/microphone_active.svg'}
                      alt="icon"
                    />
                  )}
                </div>
              )}
            {publisher && isPublisher(publisher) && !isHandsUp && (
              <RoomInnerButton onClick={() => sendHandsUp(publisher)}>
                <img src={'/asset/icons/flag.svg'} alt="icon" />
                <Text>손들기</Text>
              </RoomInnerButton>
            )}
          </BottomButtonGroup>
        </RoomWrapper>
        <Wrapper padding="0 0px 0px 0px">
          <Grid padding="8px 24px">
            <Header label={joinRoomStatus.category} leftArrow />
            <TitleWrapper>
              <Text semiBold large>
                {joinRoomStatus.roomName}
              </Text>
            </TitleWrapper>
            <StatusWrapper>
              <StatusBox icon={'/asset/icons/Join.svg'} count={5} />
              <StatusBox
                label={'hosted by'}
                text={joinRoomStatus.moderatorNickname}
                gap={'3px'}
              />
            </StatusWrapper>
          </Grid>
          {/*<div>*/}
          {/*  <p>{joinRoomStatus.roomName}</p>*/}
          {/*  <p>{joinRoomStatus.role}</p>*/}
          {/*</div>*/}
          <Divider />
          <Grid padding="16px 24px">
            <Text lineHeight={'22px'}>{joinRoomStatus.content}</Text>
          </Grid>
          {publisher && (
            <VoteView
              roomId={joinRoomStatus.roomId}
              userId={publisher.session.connection.data}
              memberAgreed={joinRoomStatus.memberAgreed}
              memberDisagreed={joinRoomStatus.memberDisagreed}
              stompClient={voteStomp}
              sock={voteSock}
            />
          )}
          <Button
            secondary
            style={{
              borderRadius: '10em',
              width: '50px',
              height: '50px',
              minWidth: 'auto',
              position: 'absolute',
              bottom: '50px',
              right: '24px',
            }}
            onClick={handleShowUserRoom}
          >
            Live
          </Button>
          <Button
            secondary
            style={{
              borderRadius: '10em',
              width: '50px',
              height: '50px',
              minWidth: 'auto',
              position: 'absolute',
              bottom: '50px',
              left: '24px',
            }}
            onClick={handleShowChatRoom}
          >
            Chat
          </Button>
        </Wrapper>
      </>
      {/*============*/}
      {publisher && showChatRoom && (
        <TextChatView
          roomId={joinRoomStatus.roomId}
          memberName={publisher.session.connection.data}
          stompClient={messageStomp}
          sock={messageSock}
          unsubscribe={unsubscribe}
          moderator={joinRoomStatus.moderatorNickname}
          active={showChatRoom}
          onClickMoveUserRoom={handleMoveUserRoom}
        />
      )}
    </>
  );
};

const BackDrop = styled.div`
  position: fixed;
  height: 100%;
  z-index: 11;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;

  &.active {
  opacity: 0.5;
  visibility: visible;
`;
const RoomWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 12;
  width: 100%;
  height: 90%;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 20px 20px 0 0;
  transition: all 0.3s ease;
  transform: translateY(100%);

  &.active {
    transform: translateY(0);
  }
`;
const InnerWrapper = styled.div`
  margin: 20px 24px;
  padding: 10px 0;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-row-gap: 13px;
  justify-items: center;
  height: calc(100% - 230px);
  overflow-y: auto;
`;
const TopButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 24px;
`;
const RoomInfoWrapper = styled.div`
  margin: 20px 24px;
`;
const StatusWrapperChat = styled.div`
  display: flex;
  column-gap: 8px;
  margin: 8px 0;
`;
const BottomButtonGroup = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 24px;
`;
const RoomInnerButton = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10em;
  padding: 7.5px 10px;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const StatusWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;
const TitleWrapper = styled.div`
  margin-bottom: 16px;
`;

export default LiveRoom;
