import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setMemberVoteStatus } from '../../modules/chat';

// let stompClient = null;

const VoteView = ({
  roomId,
  userId,
  memberAgreed,
  memberDisagreed,
  stompClient,
  sock,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    // let sock = new SockJS(process.env.REACT_APP_SOCKET_URL);
    // stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);

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
  // const leaveRoom = () => {
  //   // stompClient.disconnect(() => {
  //   //   navigate('/', { replace: true });
  //   // });
  //   stompClient.disconnect();
  // };

  const onConnected = () => {
    stompClient.subscribe(
      `/sub/chat/room/${roomId}`,
      // onMessageReceived,
      onError,
    );
    // userJoin();
  };

  const onMessageReceived = (payload) => {
    // let payloadData = JSON.parse(payload.body);
    JSON.parse(payload.body);
    // console.log('👺👺payloadData ====>', payloadData);
  };

  const onError = (err) => {
    console.error(err);
  };

  const [agree, setAgree] = useState(memberAgreed);
  const [disagree, setDisagree] = useState(memberDisagreed);

  useEffect(() => {
    const data = {
      memberAgreed: agree,
      memberDisagreed: disagree,
    };
    dispatch(setMemberVoteStatus(data));
  }, [agree, disagree]);

  // 찬성 메시지 보내기
  const sendAddAgree = () => {
    if (stompClient) {
      let message = {
        type: 'AGREE',
        roomId: roomId,
        sender: userId,
        message: null,
      };
      console.log('🫖 찬성 ==>', message);
      stompClient.send('/pub/chat/message', {}, JSON.stringify(message));
      setAgree(true);
      setDisagree(false);
    }
  };

  // 반대 메시지 보내기
  const sendAddDisagree = () => {
    if (stompClient) {
      let message = {
        type: 'DISAGREE',
        roomId: roomId,
        sender: userId,
        message: null,
      };
      console.log('🫖 반대 ==>', message);
      stompClient.send('/pub/chat/message', {}, JSON.stringify(message));
      setDisagree(true);
      setAgree(false);
    }
  };

  // 찬성 취소 메시지 보내기
  const sendCancelAgree = () => {
    if (stompClient) {
      let message = {
        type: 'CANCEL_AGREE',
        roomId: roomId,
        sender: userId,
        message: null,
      };
      console.log('🫖 찬성 ==>', message);
      stompClient.send('/pub/chat/message', {}, JSON.stringify(message));
      setAgree(false);
      setDisagree(false);
    }
  };

  // 반대 취소 메시지 보내기
  const sendCancelDisagree = () => {
    if (stompClient) {
      let message = {
        type: 'CANCEL_DISAGREE',
        roomId: roomId,
        sender: userId,
        message: null,
      };
      console.log('🫖 찬성 ==>', message);
      stompClient.send('/pub/chat/message', {}, JSON.stringify(message));
      setAgree(false);
      setDisagree(false);
    }
  };

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
      {agree ? (
        <button onClick={sendCancelAgree}>찬성취소</button>
      ) : (
        <button onClick={sendAddAgree}>찬성</button>
      )}
      {disagree ? (
        <button onClick={sendCancelDisagree}>반대취소</button>
      ) : (
        <button onClick={sendAddDisagree}>반대</button>
      )}
    </div>
  );
};

VoteView.propTypes = {
  stompClient: PropTypes.any,
  sock: PropTypes.any,
  roomId: PropTypes.number,
  disconnect: PropTypes.bool,
  userId: PropTypes.string,
  leave: PropTypes.any,
  memberAgreed: PropTypes.any,
  memberDisagreed: PropTypes.any,
};

export default VoteView;
