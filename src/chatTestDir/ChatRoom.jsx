import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

let stompClient = null;

const ChatRoom = ({ roomId, sockUrl, disconnect }) => {
  const [publicChats, setPublicChats] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    sender: '',
    connected: false,
    message: '',
  });
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let sock = new SockJS(sockUrl);
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);

    sock.addEventListener('open', () => {
      console.log('Connected to Browser!!!😀');
    });
    sock.addEventListener('message', (message) => {
      console.log('Got this:', message, '😀');
    });
    sock.addEventListener('close', () => {
      console.log('Disconnected to Server😀');
    });
  };
  const leaveRoom = () => {
    stompClient.disconnect(() => {
      navigate('/', { replace: true });
    });
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      `/sub/chat/room/${roomId}`,
      onMessageReceived,
      onError,
    );
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      sender: userData.sender,
      type: 'ENTER',
      roomId: roomId,
    };
    stompClient.send('/pub/chat/message', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    console.log('👺👺payloadData ====>', payloadData);
    setPublicChats((prevPublicChats) => [...prevPublicChats, payloadData]);
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendMessage = () => {
    console.log('👍 메시지 보내기 클릭!');
    if (stompClient) {
      let chatMessage = {
        sender: userData.sender,
        message: userData.message,
        type: 'CHAT',
        roomId: roomId,
      };
      console.log('👍 내가 보낸 메시지 ==>', chatMessage);
      stompClient.send('/pub/chat/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, sender: value });
  };

  const registerUser = () => {
    connect();
  };

  if (disconnect) {
    window.confirm('연결을 끊으시겠어요?');
    let chatMessage = {
      sender: userData.sender,
      type: 'LEAVE',
      roomId: roomId,
    };
    stompClient.send('/pub/chat/message', {}, JSON.stringify(chatMessage));
    leaveRoom();
  }
  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-content">
          {publicChats.map((chat, index) => (
            <MessageWrapper key={index}>
              {chat.type === 'ENTER' && <div>{chat.sender}님께서 입장~</div>}
              {chat.type === 'CHAT' && chat.sender !== userData.sender && (
                <div style={{ color: 'blue' }}>{chat.sender} : </div>
              )}
              <div className="message-data">{chat.message}</div>
              {chat.type === 'CHAT' && chat.sender === userData.sender && (
                <div style={{ color: 'red' }}>{chat.sender}</div>
              )}
              {chat.type === 'LEAVE' && (
                <div>{userData.sender}님이 나가셨습니다.</div>
              )}
            </MessageWrapper>
          ))}

          <div className="send-message">
            <input
              type="text"
              className="input-message"
              placeholder="enter the message"
              value={userData.message}
              onChange={handleMessage}
            />
            <button type="button" className="send-button" onClick={sendMessage}>
              send
            </button>
          </div>
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.sender}
            onChange={handleUsername}
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

ChatRoom.propTypes = {
  roomId: PropTypes.string,
  sockUrl: PropTypes.string,
  disconnect: PropTypes.bool,
};

const MessageWrapper = styled.div`
  display: flex;
`;

export default ChatRoom;
