import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import {
  closeRoomAsync,
  ovGetTokenAsync,
  removeAllRoomSubscribers,
  removeRoomSubscriber,
  selectRoomState,
  setRemoteForceMuteStatus,
  setRemoteHandsUpStatus,
  setRemotePermissionStatus,
  setRoomSubscribers,
} from '../../../../modules/chat';
import TextChatView from '../../TextChatView';
import VoteView from '../../VoteView';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { BasicModal, Button, StatusBox, Text } from 'components';
import { ChatUser } from '../../component';
import {
  BoardContentWrapper,
  BoardWrapper,
  BottomButtonGroup,
  CarouselWrapper,
  CircleButtons,
  FixedTop,
  HandIcon,
  InnerWrapper,
  MyStateWrapper,
  ParticipantControlButton,
  RoomInfoWrapper,
  RoomInnerButton,
  RoomWrapper,
  StatusWrapperChat,
  TopButtonGroup,
} from './style';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { selectModalOpen, setModalOpen } from '../../../../modules/modal';

//!Todo 마이크 선택 가능하도록!!

const LiveRoom = () => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [publisher, setPublisher] = useState(undefined);
  const [publisherProfileImage, setPublisherProfileImage] = useState(undefined);
  const [myMicStatus, setMyMicStatus] = useState(false);
  const [isHandsUp, setIsHandsUp] = useState(false);
  const [myHandsUpState, setMyHandsUpState] = useState(false);
  const [myMicMute, setMyMicMute] = useState(false);
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
  const modalState = useSelector(selectModalOpen);

  const [OV, setOV] = useState(new OpenVidu());
  const [session, setSession] = useState(OV.initSession());

  // Socket 초기화 - 여기서 초기화 해주고...
  let messageSock = new SockJS(process.env.REACT_APP_SOCKET_MESSAGE_URL);
  let voteSock = new SockJS(process.env.REACT_APP_SOCKET_VOTE_URL);
  let messageStomp = over(messageSock);
  let voteStomp = over(voteSock);

  const sendLeaveToSocket = async () => {
    let sendData = {
      sender: joinRoomStatus.memberName,
      type: 'LEAVE',
      roomId: joinRoomStatus.roomId,
      role: joinRoomStatus.role,
      agreed: memberVoteStatus.memberAgreed,
      disagreed: memberVoteStatus.memberDisagreed,
    };
    messageStomp.send('/pub/chat/message', {}, JSON.stringify(sendData));
  };
  window.onpopstate = function (event) {
    // "event" object seems to contain value only when the back button is clicked
    // and if the pop state event fires due to clicks on a button
    // or a link it comes up as "undefined"

    if (event) {
      // Code to handle back button or prevent from navigation
      if (joinRoomStatus.role !== 'MODERATOR') {
        leaveRoom().then(() => navigate('/home', { replace: true }));
      } else {
        sendForceLeave().then(() => leaveRoom());
      }
    } else {
      // Continue user action through link or button
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession().then((r) => r);
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
      // await leaveRoom();
      // await closeRoom();
    }
  };

  const leaveSession = () => {
    if (session) {
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
          session.forceDisconnect(
            sub.subscriber.stream.connection.connectionId,
          ),
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
  const [closeState, setCloseState] = useState(false);
  const [notExist, setNotExistModal] = useState(false);
  const sendForceLeave = async () => {
    const options = {
      data: JSON.stringify({ noModerator: true }),
      type: 'forceLeave',
    };
    await session
      .signal(options)
      .then(() => {
        sendLeaveToSocket();
        console.log('(SEND) 방장이 존재하지 않습니다!');
      })
      .catch((error) => console.error(error));
    setCloseState(true); // 방 종료 상태 관리
  };
  const receiveForceLeave = () => {
    if (session && joinRoomStatus.role !== 'MODERATOR') {
      session.on('signal:forceLeave', (event) => {
        leaveRoom().then((r) => r);
        dispatch(setModalOpen({ open: true, type: 'close' })); // 참여자에게 라이브 종료 팝업창 띄우기
        console.log('(RECEIVE) 방장이 존재하지 않습니다!');
      });
    }
  };

  useEffect(() => {
    subscribeToStreamDestroyed();
  }, []);
  const subscribeToStreamDestroyed = () => {
    if (session) {
      session.on('streamDestroyed', (event) => {
        console.log('🏙🏙🏙🏙🏙🏙🏙🏙');
        deleteSubscriber(event.stream.streamManager);
      });
    }
  };
  const joinSession = async () => {
    await subscribeToStreamCreated();
    await connectToSession();
    // await session.on('exception', (exception) => {
    //   console.warn(exception);
    // });
  };

  const deleteSubscriber = (streamManager) => {
    dispatch(removeRoomSubscriber({ streamManager: streamManager }));
  };

  const subscribeToStreamCreated = () => {
    if (session) {
      session.on('streamCreated', (event) => {
        let subscriber = session.subscribe(event.stream, undefined);
        // let subscribers = subscribersState;
        // subscribers.push(subscriber);
        // setSubscribersState(subscribers);

        const data = subscriber.stream.connection.data.split('%')[0];
        const imageUrl = JSON.parse(data).profileImageUrl;
        dispatch(
          setRoomSubscribers({
            subscriber: subscriber,
            profileImageUrl: imageUrl,
          }),
        );
      });
    }
  };

  // 이름 변환 함수
  const convertStreamData = (target) => {
    const data = target.stream.connection.data.split('%');
    const UserName = data[data.length - 1];
    return UserName;
  };

  const connectToSession = () => {
    getToken()
      .then((token) => {
        connect(token);
      })
      .catch((error) => {
        alert(`There was an error getting the token: ${error.message}`);
      });
  };

  const connect = (token) => {
    session
      .connect(token, {
        profileImageUrl: localStorage.getItem('profileImageUrl'),
      })
      .then(() => {
        connectVoice().then((r) => r);
      })
      .catch((error) => {
        //!Todo 나중에 무조건 Alert 삭제해야함! 그래야 페이지 이동 바로됨!
        // alert(`There was an error connecting to the session: ${error.message}`);
        alert('이미 종료된 방입니다!');
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message,
        );
        localStorage.removeItem('OVAccessToken');
        navigate('/home', { replace: true });
      });
  };

  const connectVoice = async () => {
    const devices = await OV.getDevices();
    // const videoDevices = devices.filter((device) => {
    //   return device.kind === 'videoinput';
    // });
    const audioDevices = devices.filter((device) => {
      return device.kind === 'audioinput';
    });
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

    await session.publish(initPublisher);
    setPublisher(initPublisher);
    setPublisherProfileImage(localStorage.getItem('profileImageUrl'));
  };

  const getToken = async () => {
    const data = {
      roomId: joinRoomStatus.roomId,
      memberName: joinRoomStatus.memberName,
      role: joinRoomStatus.role,
      participantCount: joinRoomStatus.maxParticipantCount,
    };
    return await dispatch(ovGetTokenAsync(data))
      .then((res) => {
        localStorage.setItem('OVAccessToken', res.payload.data.token);
        return res.payload.data.token;
      })
      .catch((err) => {
        console.error(err);
        navigate('/home', { replace: true });
      });
  };

  const leaveRoom = async () => {
    if (joinRoomStatus.role === 'MODERATOR') {
      await closeRoom();
    } else {
      if (modalState.type !== 'close') {
        dispatch(setModalOpen({ open: true, type: 'leave' })); // 참여자에게 비정상적으로 방을 떠났다는 팝업 띄우기
      }
    }
    // 2. 전역에서 관리하고 있는 Subscribers 목록을 초기화한다.
    await dispatch(removeAllRoomSubscribers());
    // 1. Leave 메시지를 각 소켓 앤드포인트에 보낸다.
    await sendLeaveToSocket();
    // 3. session 연결을 끊는다.
    await leaveSession();
    // 4. 로컬 저장소에 저장한 openvidu token 을 제거한다.
    await localStorage.removeItem('OVAccessToken');
    // 5. 페이지를 이동시킨다.
    await navigate('/home', { replace: true });
    // await (window.location.href = `/home`);
  };

  // 마이크 상태가 변할 때 메세지를 보낸다
  const sendChangeMicStatus = () => {
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
    if (session) {
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
    const requester = sub.stream.connection.connectionId;
    const options = {
      data: JSON.stringify({ forceMute: true, requester: requester }),
      type: 'forceMute',
    };
    if (session) {
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
      //
      // // 상대방 마이크 시각적 확인
      // setRemoteMicStatus({
      //   remoteTarget: requester,
      //   isAudioActive: false,
      // });
    }
  };
  useEffect(() => {
    receiveForceMute();
  }, [publisher]);
  const receiveForceMute = () => {
    if (session) {
      session.on('signal:forceMute', (event) => {
        const data = JSON.parse(event.data);
        console.log('참여자에 대한 강제 음소거 메시지를 받았습니다!');
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
        dispatch(
          setRemotePermissionStatus({
            remoteTarget: data.requester,
            permitSpeaking: true,
          }),
        );
        dispatch(
          setRemoteForceMuteStatus({
            remoteTarget: data.requester,
            forceMute: false,
          }),
        );

        // 상대방 마이크 시각적 확인
        setRemoteMicStatus({
          remoteTarget: data.requester,
          isAudioActive: false,
        });
        setIsHandsUp(false);
        setMyMicMute(false);
        setMyHandsUpState(false);
      });
    }
  };

  useEffect(() => {
    receiveHandsUp();
  }, []);

  // 발언권을 요청할 때
  const sendHandsUp = (publisher) => {
    const requester = publisher.stream.connection.connectionId;
    const handsUpOptions = {
      data: JSON.stringify({ requester: requester, isHandsUp: true }),
      type: 'handsUp',
    };
    session
      .signal(handsUpOptions)
      .then(() => console.log('발언하고 싶다고 전송되었습니다!'))
      .catch((error) => console.error(error));
    // setIsHandsUp(true);
    setMyHandsUpState(true);
  };

  // 발언권 요청자를 받을 때
  const receiveHandsUp = () => {
    if (session) {
      session.on('signal:handsUp', (event) => {
        const data = JSON.parse(event.data);
        const remoteTarget = event.from.connectionId;

        // 전역에서 관리해야 발언권 요청자 모두를 보여줄 수 있다.
        //!FixMe 위 주석은 틀린 이유이다. 진짜 이유는 dispatch 가 실행될 때 마다 리렌더링을 하기에 다른 구독자도 볼 수 있는 것이었다...
        // setRemoteHandsUpState({
        //   remoteTarget: data.requester,
        //   isHandsUp: data.isHandsUp,
        // });
        dispatch(
          setRemoteHandsUpStatus({
            remoteTarget: data.requester,
            isHandsUp: data.isHandsUp,
          }),
        );

        // 참여자가 재요청을 할 때 손들기 보기 위함(방장)
        dispatch(
          setRemotePermissionStatus({
            remoteTarget: remoteTarget,
            permitSpeaking: false,
          }),
        );
        console.log('발언 요청을 받았습니다!');
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
    // return (
    //   remoteHandsUpState.remoteTarget === sub.stream.connection.connectionId
    // );
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
    if (session) {
      session
        .signal(options)
        .then(() => console.log('발언 요청에 대한 허가를 전송하였습니다!'))
        .catch((error) => console.error(error));

      // //상대방 마이크 상태 시각적 확인
      // setRemoteMicStatus({
      //   remoteTarget: requester,
      //   isAudioActive: true,
      // });
      //
      // dispatch(
      //   setRemotePermissionStatus({
      //     remoteTarget: requester,
      //     permitSpeaking: true,
      //   }),
      // );
      // dispatch(
      //   setRemoteForceMuteStatus({
      //     remoteTarget: requester,
      //     forceMute: true,
      //   }),
      // );
    }
  };

  // deps 에 publisher 를 넣어놓은 이유는 메시지를 받을 때는 항상 publisher 가 초기화된다. 메시지 보낼 때 같이 보내줘야하는데 보내는 것 자체가 불가능한 것 같다.
  // deps 에 넣어주면 처음에는 못 받아오지만 한번 더 렌더링 되면서 받아온다.. 이유는 모르겠다.. 어디서 publisher 가 변한다고 감지하는지 모르겠다..
  useEffect(() => {
    receivePermitSpeaking();
  }, [publisher]);

  // 발언권 부여 수락 메시지
  const receivePermitSpeaking = () => {
    if (session) {
      session.on('signal:speaking', (event) => {
        const data = JSON.parse(event.data);
        const remoteTarget = event.from.connectionId;
        console.log('발언 요청에 대한 허가가 떨어졌습니다!');
        if (publisher && data.requester === isPublisherId(publisher)) {
          console.log('퍼블리셔와 리퀘스터가 똑같아!!');
          publisher.publishAudio(true);
          setIsHandsUp(true);
          setMyMicMute(true);
          setMyHandsUpState(false); // 나의 프로필 손든 상태 관리
        }
        // if (publisher && publisher.stream.audioActive) {
        // }
        //상대방 마이크 상태 시각적 확인
        setRemoteMicStatus({
          remoteTarget: data.requester,
          isAudioActive: true,
        });

        dispatch(
          setRemotePermissionStatus({
            remoteTarget: data.requester,
            permitSpeaking: true,
          }),
        );
        dispatch(
          setRemoteForceMuteStatus({
            remoteTarget: data.requester,
            forceMute: true,
          }),
        );
      });
    }
  };

  console.log('💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌');

  const [pageIndex, setPageIndex] = useState(1);
  const handleClickMoveVotePage = () => {
    setPageIndex(2);
  };
  const handleChangePageIndex = (index) => {
    setPageIndex(index);
  };

  // publisher 음성인식
  const [detectSpeaking, setDetectSpeaking] = useState(false);
  useEffect(() => {
    publisherDetectSpeaking();
  }, [publisher]);
  const publisherDetectSpeaking = () => {
    if (publisher) {
      publisher.on('publisherStartSpeaking', (event) => {
        console.log('The local user start speaking');
        setDetectSpeaking(true);
      });
      publisher.on('publisherStopSpeaking', (event) => {
        console.log('The local user stop speaking');
        setDetectSpeaking(false);
      });
    }
  };

  const [subSpeaker, setSubSpeaker] = useState({
    speaker: '',
    activate: false,
  });
  useEffect(() => {
    subscriberDetectSpeaking(roomSubscribers);
  }, [roomSubscribers]);
  const subscriberDetectSpeaking = (roomSubscribers) => {
    roomSubscribers.forEach((subscriber) => {
      subscriber.subscriber.on('publisherStartSpeaking', (event) => {
        console.log('User ' + event.connection.connectionId + ' stop speaking');
        setSubSpeaker({
          speaker: event.connection.connectionId,
          activate: true,
        });
      });
      subscriber.subscriber.on('publisherStopSpeaking', (event) => {
        console.log('User ' + event.connection.connectionId + ' stop speaking');
        setSubSpeaker({
          speaker: event.connection.connectionId,
          activate: false,
        });
      });
    });
  };

  const BottomFunctionalButtons = () => {
    return (
      <BottomButtonGroup>
        <RoomInnerButton onClick={() => setPageIndex(0)}>
          <img src={'/asset/icons/paper-plane.svg'} alt="icon" />
          <Text>채팅방</Text>
        </RoomInnerButton>

        <CircleButtons>
          {/* 투표 페이지로 이동 */}
          <img
            src={
              pageIndex === 2
                ? '/asset/icons/vote_normal_active.svg'
                : '/asset/icons/vote_normal.svg'
            }
            alt="icon"
            onClick={handleClickMoveVotePage}
          />
          {publisher &&
            (isModerator(publisher) ||
              (isPublisher(publisher) && myMicMute)) && (
              <div onClick={sendChangeMicStatus}>
                {myMicStatus ? (
                  <img src={'/asset/icons/microphone_normal.svg'} alt="icon" />
                ) : (
                  <img
                    src={'/asset/icons/microphone_normal_active.svg'}
                    alt="icon"
                  />
                )}
              </div>
            )}
          {publisher && isPublisher(publisher) && !isHandsUp && (
            <div onClick={() => sendHandsUp(publisher)}>
              {myHandsUpState ? (
                <>
                  <MyStateWrapper>
                    <Text size={'small'}>발언권 요청!</Text>
                    <div />
                  </MyStateWrapper>
                  <img src={'/asset/icons/raisehand_active.svg'} alt="icon" />
                </>
              ) : (
                <img src={'/asset/icons/raisehand.svg'} alt="icon" />
              )}
            </div>
          )}
        </CircleButtons>
      </BottomButtonGroup>
    );
  };

  return (
    <>
      {/*<BasicModal*/}
      {/*  open={notExist}*/}
      {/*  onConfirm={() => {*/}
      {/*    setNotExistModal(false);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  이미 종료된 방입니다*/}
      {/*</BasicModal>*/}
      <BasicModal
        open={closeState}
        onConfirm={() => {
          setCloseState(false);
          leaveRoom().then((r) => r);
        }}
      >
        라이브를 종료했습니다!
      </BasicModal>
      <div id="live_room_wrapper" style={{ height: '100%' }}>
        <FixedTop>
          <TopButtonGroup>
            {publisher && isPublisher(publisher) && (
              <Button
                size={'small'}
                shape={'rounded'}
                backgroundColor={themeContext.colors.lightGray}
                color={themeContext.colors.black}
                onClick={leaveRoom}
              >
                방 나기기
              </Button>
            )}
            {publisher && isModerator(publisher) && (
              <Button
                style={{ minWidth: '30px' }}
                size={'small'}
                shape={'rounded'}
                backgroundColor={themeContext.colors.lightGray}
                color={themeContext.colors.black}
                onClick={sendForceLeave}
              >
                방 종료하기
              </Button>
            )}
          </TopButtonGroup>
          <RoomInfoWrapper>
            <Text large semiBold>
              {joinRoomStatus.roomName}
            </Text>
            <StatusWrapperChat>
              <StatusBox
                live
                liveBackgroundColor={themeContext.colors.blue}
                count={roomSubscribers.length + 1}
              />
              <StatusBox
                label={'hosted by'}
                text={joinRoomStatus.moderatorNickname}
                gap={'3px'}
                // backgroundColor={themeContext.colors.white}
              />
            </StatusWrapperChat>
          </RoomInfoWrapper>
        </FixedTop>
        <CarouselWrapper>
          <Carousel
            className="room_carousel"
            showIndicators={false}
            axis={'horizontal'}
            emulateTouch
            showArrows={false}
            showStatus={false}
            preventMovementUntilSwipeScrollTolerance
            swipeScrollTolerance={100}
            selectedItem={pageIndex}
            onChange={handleChangePageIndex}
            showThumbs={false}
          >
            <>
              {publisher && (
                <TextChatView
                  roomId={joinRoomStatus.roomId}
                  memberName={convertStreamData(publisher)}
                  stompClient={messageStomp}
                  sock={messageSock}
                  // unsubscribe={unsubscribe}
                  moderator={joinRoomStatus.moderatorNickname}
                />
              )}
            </>
            <RoomWrapper>
              <InnerWrapper>
                {publisher && (
                  <ChatUser
                    streamManager={publisher}
                    moderator={joinRoomStatus.moderatorNickname}
                    memberName={convertStreamData(publisher)}
                    isMute={
                      (isModerator(publisher) ||
                        (isPublisher(publisher) && myMicMute)) &&
                      publisher.stream.audioActive
                    }
                    detectSpeaking={detectSpeaking}
                    myHandsUpState={myHandsUpState}
                    profileImageUrl={publisherProfileImage}
                  />
                )}
                {roomSubscribers.map((sub, i) => {
                  // subscriberDetectSpeaking(sub.subscriber);
                  return (
                    <>
                      <div style={{ position: 'relative', maxWidth: '75px' }}>
                        <ChatUser
                          key={i}
                          streamManager={sub.subscriber}
                          moderator={joinRoomStatus.moderatorNickname}
                          memberName={convertStreamData(sub.subscriber)}
                          // initialMicState={sub.subscriber.stream.audioActive}
                          isMute={
                            // 처음 접속시 참여자들 마이크 상태 확인용
                            //
                            // sub.subscriber.stream.audioActive ||
                            (sub.subscriber.stream.connection.connectionId ===
                              remoteMicStatus.remoteTarget &&
                              remoteMicStatus.isAudioActive) ||
                            (sub.subscriber.stream.connection.connectionId ===
                              remotePermissionStatus.remoteTarget &&
                              remotePermissionStatus.permitSpeaking)
                          }
                          detectSpeaking={
                            subSpeaker.speaker ===
                              sub.subscriber.stream.connection.connectionId &&
                            subSpeaker.activate
                          }
                          profileImageUrl={sub.profileImageUrl}
                        />
                        {publisher &&
                          isModerator(publisher) &&
                          remoteTarget(sub.subscriber) &&
                          remoteTargetForceMuteStatus(sub.subscriber) && (
                            <ParticipantControlButton
                              onClick={() => sendForceMute(sub.subscriber)}
                            >
                              마이크 off
                            </ParticipantControlButton>
                          )}
                        {publisher &&
                          isModerator(publisher) &&
                          remoteTarget(sub.subscriber) &&
                          !remoteTargetPermissionStatus(sub.subscriber) && (
                            <>
                              <ParticipantControlButton
                                onClick={() =>
                                  sendPermitSpeaking(sub.subscriber)
                                }
                              >
                                수락하기
                              </ParticipantControlButton>
                              <HandIcon>
                                <img
                                  src={'/asset/icons/raisehand_active_mini.svg'}
                                  alt="icon"
                                />
                              </HandIcon>
                            </>
                          )}
                      </div>
                    </>
                  );
                })}
              </InnerWrapper>
            </RoomWrapper>
            <BoardWrapper>
              <BoardContentWrapper padding="16px 24px">
                <Text lineHeight={'22px'} preWrap>
                  {joinRoomStatus.content}
                </Text>
              </BoardContentWrapper>
              {publisher && (
                <VoteView
                  roomId={joinRoomStatus.roomId}
                  memberName={convertStreamData(publisher)}
                  role={joinRoomStatus.role}
                  memberAgreed={joinRoomStatus.memberAgreed}
                  memberDisagreed={joinRoomStatus.memberDisagreed}
                  stompClient={voteStomp}
                  sock={voteSock}
                  agreeCount={joinRoomStatus.agreeCount}
                  disagreeCount={joinRoomStatus.disagreeCount}
                />
              )}
            </BoardWrapper>
          </Carousel>
        </CarouselWrapper>

        {/* 하단 기능 버튼 모음 */}
        {pageIndex !== 0 && <BottomFunctionalButtons />}
      </div>
    </>
  );
};

export default LiveRoom;
