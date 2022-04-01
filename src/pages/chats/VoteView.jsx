import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setMemberVoteStatus } from '../../modules/chat';
import { VoteResultBar } from '../../components';
import { VoteResultBarWrapper } from './views/LiveRoom/style';

const VoteView = ({
  roomId,
  userId,
  memberAgreed,
  memberDisagreed,
  stompClient,
  sock,
  agreeCount,
  disagreeCount,
}) => {
  const dispatch = useDispatch();
  const [agree, setAgree] = useState(memberAgreed);
  const [disagree, setDisagree] = useState(memberDisagreed);
  const [agreeCountState, setAgreeCountState] = useState(agreeCount);
  const [disagreeCountState, setDisagreeCountState] = useState(disagreeCount);

  useEffect(() => {
    connect();
  }, []);

  console.log('memberAgreed', memberAgreed);
  console.log('memberDisagreed', memberDisagreed);

  useEffect(() => {
    const data = {
      memberAgreed: agree,
      memberDisagreed: disagree,
    };
    dispatch(setMemberVoteStatus(data));
  }, [agree, disagree]);

  const connect = () => {
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

  const onConnected = () => {
    stompClient.subscribe(
      `/sub/chat/vote/${roomId}`,
      onMessageReceived,
      onError,
    );
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    setAgreeCountState(payloadData.agreeCount);
    setDisagreeCountState(payloadData.disagreeCount);
    console.log('👺👺payloadData ====>', payloadData);
  };

  const onError = (err) => {
    console.error(err);
  };

  // 찬성 메시지 보내기
  const sendAddAgree = () => {
    if (stompClient) {
      let message = {
        type: 'AGREE',
        roomId: roomId,
        sender: userId,
        agreedBefore: agree,
        disagreedBefore: disagree,
      };
      stompClient.send('/pub/chat/vote', {}, JSON.stringify(message));
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
        agreedBefore: agree,
        disagreedBefore: disagree,
      };
      stompClient.send('/pub/chat/vote', {}, JSON.stringify(message));
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
        agreedBefore: agree,
        disagreedBefore: disagree,
      };
      stompClient.send('/pub/chat/vote', {}, JSON.stringify(message));
      setAgree(false);
    }
  };

  // 반대 취소 메시지 보내기
  const sendCancelDisagree = () => {
    if (stompClient) {
      let message = {
        type: 'CANCEL_DISAGREE',
        roomId: roomId,
        sender: userId,
        agreedBefore: agree,
        disagreedBefore: disagree,
      };
      stompClient.send('/pub/chat/vote', {}, JSON.stringify(message));
      setDisagree(false);
    }
  };
  return (
    <VoteResultBarWrapper>
      <VoteResultBar
        agreeCount={agreeCountState}
        disagreeCount={disagreeCountState}
        onClickAgree={agree ? sendCancelAgree : sendAddAgree}
        onClickDisagree={disagree ? sendCancelDisagree : sendAddDisagree}
        selected={agree ? '찬성' : disagree ? '반대' : '없다'}
      />
    </VoteResultBarWrapper>
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
  agreeCount: PropTypes.number,
  disagreeCount: PropTypes.number,
};

export default VoteView;
