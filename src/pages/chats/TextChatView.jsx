import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ChatWrapper,
  EnterLeaveWrapper,
  Messenger,
  MessengerInner,
  MessengerWrapper,
  TextInputWrapper,
  UserProfileImage,
} from './style';
import { Button, Text, Textarea } from '../../components';
import { ThemeContext } from 'styled-components';

const TextChatView = ({ stompClient, sock, roomId, memberName, moderator }) => {
  const themeContext = useContext(ThemeContext);
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    sender: '',
    // connected: false,
    message: '',
    sentAt: 0,
    profileUrl: localStorage.getItem('profileImageUrl'),
  });
  useEffect(() => {
    connect();
    return () => {
      stompClient.unsubscribe();
      stompClient.disconnect();
    };
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

  const chat = document.getElementById('chat_content');

  const today = new Date().getTime();

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
    // chat.scrollTop = chat.scrollHeight;
    let payloadData = JSON.parse(payload.body);
    const messageTime = calcTime(payloadData.sentAt);
    // console.log('messageTime :::', messageTime);
    // console.log('👺payloadData ====>', payloadData);
    setPublicChats((prevPublicChats) => [
      ...prevPublicChats,
      {
        type: payloadData.type,
        sender: payloadData.sender,
        message: payloadData.message,
        sentAt: payloadData.sentAt,
        profileUrl: payloadData.profileUrl,
      },
    ]);
  };
  // console.log(publicChats);

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
    chat.scrollTop = chat.scrollHeight;
  };

  const handleKeyDownSendMessage = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage();
    }
  };

  const calcTime = (sentAt) => {
    const receivedTime = Number(sentAt);

    const resultTime = Math.floor((today - receivedTime) / 1000 / 60);
    if (resultTime < 1) {
      return '방금';
    }
    if (resultTime < 60) {
      return `${resultTime}분전`;
    }
    const resultTimeHour = Math.floor(resultTime / 60);
    if (resultTimeHour < 24) {
      return `${resultTimeHour}시간전`;
    }
    const resultTimeDay = Math.floor(resultTime / 60 / 24);
    if (resultTimeDay < 365) {
      return `${resultTimeDay}일전`;
    }
    // return `${Math.floor(resultTimeDay / 365)}년전`;
  };
  const sendMessage = () => {
    chat.scrollTop = chat.scrollHeight;
    if (stompClient) {
      let chatMessage = {
        sender: memberName,
        message: userData.message,
        type: 'CHAT',
        roomId: roomId,
        sentAt: today.toString(),
        profileUrl: localStorage.getItem('profileImageUrl'),
      };
      stompClient.send('/pub/chat/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };
  return (
    <>
      {userData.connected && (
        <>
          <ChatWrapper id="chat_content">
            {/*<ChatWrapper className={active && 'active'}>*/}
            {/*<Button>숨기기</Button>*/}
            <div>
              {publicChats.map((chat, index) => (
                <div key={index}>
                  {chat.type === 'ENTER' && (
                    <EnterLeaveWrapper key={index}>
                      <Text>{chat.sender}님이 입장하셨습니다.</Text>
                    </EnterLeaveWrapper>
                  )}
                  {chat.type === 'CHAT' && chat.sender !== memberName && (
                    <MessengerWrapper key={index}>
                      <UserProfileImage src={chat.profileUrl} alt="user" />
                      <MessengerInner>
                        <Messenger>
                          <Text semiBold>{chat.sender}</Text>
                          <Text
                            tiny
                            color={themeContext.colors.gray}
                            style={{ marginLeft: '8px' }}
                          >
                            {calcTime(chat.sentAt)}
                          </Text>
                        </Messenger>
                        <Text
                          className="message-data"
                          preWrap
                          color={themeContext.colors.black}
                        >
                          {chat.message}
                        </Text>
                      </MessengerInner>
                    </MessengerWrapper>
                  )}
                  {chat.type === 'CHAT' && chat.sender === memberName && (
                    <MessengerWrapper key={index}>
                      <UserProfileImage
                        // src={'/asset/image/users/test.png'}
                        src={chat.profileUrl}
                        alt="user"
                      />
                      <MessengerInner>
                        <Messenger>
                          <Text semiBold>{chat.sender}(나)</Text>
                          <Text
                            tiny
                            color={themeContext.colors.gray}
                            style={{ marginLeft: '8px' }}
                          >
                            {calcTime(chat.sentAt)}
                          </Text>
                        </Messenger>
                        <Text className="message-data" preWrap>
                          {chat.message}
                        </Text>
                      </MessengerInner>
                    </MessengerWrapper>
                  )}
                  {chat.type === 'LEAVE' && (
                    <EnterLeaveWrapper key={index}>
                      <Text>{chat.sender}님이 나가셨습니다.</Text>
                    </EnterLeaveWrapper>
                  )}
                </div>
              ))}
            </div>
          </ChatWrapper>

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
              onFocus={() => (chat.scrollTop = chat.scrollHeight)}
            />
            <Button
              size={'small'}
              shape="rounded"
              style={{
                minWidth: 'auto',
                whiteSpace: 'nowrap',
                marginLeft: '16px',
              }}
              onClick={sendMessage}
              disabled={userData.message === ''}
            >
              전송
            </Button>
          </TextInputWrapper>
        </>
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
