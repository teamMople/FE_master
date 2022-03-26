import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  BackDrop,
  ChatWrapper,
  JoinerLeaver,
  Receiver,
  ReceiverInner,
  ReceiverWrapper,
  Sender,
  SenderInner,
  SenderWrapper,
  TextInputWrapper,
} from './style';
import { Button, Text, Textarea } from '../../components';
import { ThemeContext } from 'styled-components';
import { useDispatch } from 'react-redux';
import { hideChat } from '../../modules/chat';

// let stompClient = null;

const TextChatView = ({
  stompClient,
  sock,
  roomId,
  memberName,
  unsubscribe,
  moderator,
  className,
  onClickShow,
  active,
  onClickMoveUserRoom,
}) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    sender: '',
    connected: false,
    message: null,
  });
  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    stompClient.connect({ memberName: memberName }, onConnected, onError);

    sock.addEventListener('open', () => {
      // console.log('Connected to Browser!!!😀');
    });
    sock.addEventListener('message', (message) => {
      // console.log('Got this:', message, '😀');
    });
    sock.addEventListener('close', () => {
      // console.log('Disconnected to Server😀');
    });
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      `/sub/chat/room/${roomId}`,
      onMessageReceived,
      // onError,
      { id: moderator },
    );
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      // sender: userData.sender,
      sender: memberName,
      type: 'ENTER',
      roomId: roomId,
    };
    stompClient.send('/pub/chat/message', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    console.log('👺👺payloadData ====>', payloadData.agreeCount);
    setPublicChats((prevPublicChats) => [...prevPublicChats, payloadData]);
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const handleKeyDownSendMessage = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage();
    }
  };
  const sendMessage = () => {
    // console.log('👍 메시지 보내기 클릭!');
    if (stompClient) {
      let chatMessage = {
        sender: memberName,
        message: userData.message,
        type: 'CHAT',
        roomId: roomId,
      };
      // console.log('👍 내가 보낸 메시지 ==>', chatMessage);
      stompClient.send('/pub/chat/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  // const registerUser = () => {
  //   connect();
  // };

  // if (disconnect) {
  //   let chatMessage = {
  //     sender: userId,
  //     type: 'LEAVE',
  //     roomId: roomId,
  //   };
  //   stompClient.send('/pub/chat/message', {}, JSON.stringify(chatMessage));
  //   leaveRoom();
  // }
  return (
    <>
      {userData.connected && (
        <ChatWrapper className={active && 'active'}>
          {/*<Button>숨기기</Button>*/}
          {publicChats.map((chat, index) => (
            <>
              {chat.type === 'ENTER' && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `${themeContext.colors.lightGray}`,
                    margin: '10px',
                  }}
                >
                  <Text key={index}>{chat.sender}님이 입장하셨습니다.</Text>
                </div>
              )}
              {chat.type === 'CHAT' && chat.sender !== memberName && (
                <ReceiverWrapper key={index}>
                  <ReceiverInner>
                    <Receiver>{chat.sender}</Receiver>
                    <Text
                      className="message-data"
                      preWrap
                      color={themeContext.colors.white}
                    >
                      {chat.message}
                    </Text>
                  </ReceiverInner>
                </ReceiverWrapper>
              )}
              {chat.type === 'CHAT' && chat.sender === memberName && (
                <SenderWrapper key={index}>
                  <SenderInner>
                    <Sender>{chat.sender}</Sender>
                    <Text className="message-data" preWrap>
                      {chat.message}
                    </Text>
                  </SenderInner>
                </SenderWrapper>
              )}
              {chat.type === 'LEAVE' && (
                <JoinerLeaver key={index}>
                  {chat.sender}님이 나가셨습니다.
                </JoinerLeaver>
              )}
            </>
          ))}

          <TextInputWrapper>
            <Textarea
              fluid
              height="34px"
              backgroundColor={themeContext.colors.backgroundGray}
              border="none"
              borderRadius="10px"
              placeholder="메시지를 입력하세요"
              padding="8px 12px 8px 12px"
              value={userData.message}
              onChange={handleMessage}
              onKeyDown={handleKeyDownSendMessage}
            />
            <Button
              small
              shape="rounded"
              style={{ minWidth: 'auto', whiteSpace: 'nowrap' }}
              onClick={sendMessage}
              disabled={userData.message === ''}
            >
              보내기
            </Button>
          </TextInputWrapper>
        </ChatWrapper>
      )}
    </>
  );
};

TextChatView.propTypes = {
  stompClient: PropTypes.any,
  sock: PropTypes.any,
  roomId: PropTypes.number,
  disconnect: PropTypes.bool,
  memberName: PropTypes.string,
  unsubscribe: PropTypes.bool,
  active: PropTypes.bool,
  moderator: PropTypes.string,
  className: PropTypes.any,
  onClickShow: PropTypes.func,
  onClickMoveUserRoom: PropTypes.func,
};

export default TextChatView;
