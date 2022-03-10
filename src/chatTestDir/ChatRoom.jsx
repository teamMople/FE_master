import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import PropTypes from 'prop-types';
import styled from 'styled-components';

let stompClient = null;

const ChatRoom = ({ roomId, sockUrl }) => {
  const [publicChats, setPublicChats] = useState([]);
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

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);
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
    console.log('👺👺payload ====>', payload);
    let payloadData = JSON.parse(payload.body);
    console.log('👺👺payloadData ====>', payloadData);
    publicChats.push(payloadData);
    setPublicChats([...publicChats]);
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    console.log('sendValue 👍');
    if (stompClient) {
      let chatMessage = {
        sender: userData.sender,
        message: userData.message,
        type: 'CHAT',
        roomId: roomId,
      };
      console.log(chatMessage, '👍');
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
  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-content">
          {publicChats.map((chat, index) => (
            <MessageWrapper key={index}>
              {chat.sender !== userData.sender && (
                <div style={{ color: 'blue' }}>{chat.sender} : </div>
              )}
              <div className="message-data">{chat.message}</div>
              {chat.sender === userData.sender && (
                <div style={{ color: 'red' }}>{chat.sender}</div>
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
            <button type="button" className="send-button" onClick={sendValue}>
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
            value={userData.username}
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
};

const MessageWrapper = styled.div`
  display: flex;
`;

export default ChatRoom;
