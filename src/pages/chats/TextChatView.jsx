import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ChatWrapper,
  JoinerLeaver,
  Receiver,
  ReceiverInner,
  ReceiverWrapper,
  Sender,
  SenderInner,
  SenderWrapper,
} from './style';

// let stompClient = null;

const TextChatView = ({ stompClient, sock, roomId, userId }) => {
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    sender: '',
    connected: false,
    message: '',
  });
  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    // let sock = new SockJS(process.env.REACT_APP_SOCKET_URL);
    // stompClient = over(sock);
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
  // const leaveRoom = () => {
  //   // stompClient.disconnect(() => {
  //   //   navigate('/', { replace: true });
  //   // });
  //   stompClient.disconnect();
  // };

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
      // sender: userData.sender,
      sender: userId,
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
    // console.log('👍 메시지 보내기 클릭!');
    if (stompClient) {
      let chatMessage = {
        sender: userId,
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
    <div className="container">
      {userData.connected && (
        <ChatWrapper>
          {publicChats.map((chat, index) => (
            <>
              {chat.type === 'ENTER' && (
                <JoinerLeaver key={index}>
                  {chat.sender}님께서 입장~
                </JoinerLeaver>
              )}
              {chat.type === 'CHAT' && chat.sender !== userId && (
                <ReceiverWrapper key={index}>
                  <ReceiverInner>
                    <Receiver>{chat.sender}</Receiver>
                    <div className="message-data">{chat.message}</div>
                  </ReceiverInner>
                </ReceiverWrapper>
              )}
              {chat.type === 'CHAT' && chat.sender === userId && (
                <SenderWrapper key={index}>
                  <SenderInner>
                    <Sender>{chat.sender}</Sender>
                    <div className="message-data">{chat.message}</div>
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
        </ChatWrapper>
      )}
    </div>
  );
};

TextChatView.propTypes = {
  stompClient: PropTypes.any,
  sock: PropTypes.any,
  roomId: PropTypes.number,
  disconnect: PropTypes.bool,
  userId: PropTypes.string,
};

export default TextChatView;
