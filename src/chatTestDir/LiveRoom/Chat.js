import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Chat = ({ user }) => {
  const [messageListState, setMessageListState] = useState([]);
  const [message, setMessage] = useState(undefined);
  console.log(user);
  useEffect(() => {
    didMount();
  }, [messageListState]);

  const didMount = () => {
    // 채팅 내용 받기
    user.stream.session.on('signal:chat', (event) => {
      const data = JSON.parse(event.data);
      let messageList = messageListState;
      messageList.push({
        connectionId: event.from.connectionId,
        nickname: data.nickname,
        message: data.message,
      });
      setMessageListState(messageList);
    });
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    console.log();
    const data = {
      message: message.replace(/ +(?= )/g, ''),
      nickname: 'TEST USER',
      streamId: user.stream.streamId,
    };
    user.stream.session.signal({
      data: JSON.stringify(data),
      type: 'chat',
    });
  };
  return (
    <>
      {messageListState.map((data, idx) => (
        <div key={idx}>
          {/*<div>{data.nickname}</div>*/}
          <div>{data.connectionId}</div>
          <div>{data.message}</div>
        </div>
      ))}
      <input onChange={handleChangeMessage} />
      <button onClick={sendMessage}>보내기</button>
    </>
  );
};

Chat.propTypes = {
  user: PropTypes.any,
};
export default Chat;
