import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const VoiceRoom = () => {
  const [stream, setStream] = useState(null);
  const [microphone, setMicrophone] = useState(null);
  const [disconnect, setDisconnect] = useState(false);
  const [myPeerConnection, setMyPeerConnection] = useState(null);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 방 ID
  const roomId = params.roomId;

  // 방 제목
  const roomName = location.state.roomName;
  const moderator = location.state.moderator;

  useEffect(() => {
    // connect();
    connectAudio().then((r) => r);
    getMicrophone().then((r) => r);
    makeConnection().then((r) => r);
  }, []);
  const myVoice = useRef();
  const inputRef = useRef();

  const connectAudio = async () => {
    await navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((currentStream) => {
        const voice = myVoice.current;
        voice.srcObject = currentStream;
        // voice.play();
        setStream(currentStream);
      });
  };

  const getMicrophone = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const microphones = devices.filter(
      (device) => device.kind === 'audioinput',
    );
    await setMicrophone(microphones);
  };
  // console.log(microphone);

  const handleClickMute = () => {
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    // console.log(stream.getAudioTracks());
  };

  // const handleWelcomeSubmit = (e) => {
  //   e.preventDefault();
  //   const input = inputRef.current.value;
  //
  //   // console.log(input);
  // };

  // const socket = new SockJS('http://localhost:8080/ws-stomp'); // 백앤드 엔드포인트 연결
  // const stomp = Stomp.over(socket); // sprint boot가 stomp 프로토콜 방식이니 프론트에서도 stomp 프로토콜 위에 sockJS가 돌아가도록 인자로 넣어준다.
  // stomp.connect({}, (frame) => {
  //   console.log('☠️ CONNECTED FRAME =======> ', frame);
  //   stomp.subscribe('/topic/greetings', (greetings) => {
  //     console.log(JSON.parse(greetings.body).content);
  //   });
  // });

  const sockUrl = 'http://localhost:8080/ws-stomp';

  const leaveRoom = () => {
    setDisconnect(true);
  };

  // RTC code
  const makeConnection = async () => {
    const peerConnection = new RTCPeerConnection();
    await console.log(stream);
    await console.log(peerConnection);
    stream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, stream));
  };

  return (
    <>
      {/* ---- 채팅방 ----*/}
      <div>실시간 채팅방</div>
      <p>방제 : {roomName}</p>
      <p>방장 : {moderator}</p>
      <ChatRoom roomId={roomId} sockUrl={sockUrl} disconnect={disconnect} />
      <hr />

      <button onClick={leaveRoom}>방 나가기</button>
      <div>
        <form onSubmit={() => ''}>
          <input placeholder={'room name'} type="text" ref={inputRef} />
          <button>Enter room</button>
        </form>
      </div>
      <div>
        <UserImageWrapper>
          <audio ref={myVoice} />
          <img src="asset/image/usericon.jpeg" alt={'user'} />
        </UserImageWrapper>
        <button onClick={handleClickMute}>음소거</button>
        <p>마이크 선택</p>
        <select>
          {microphone &&
            microphone.map((item, idx) => (
              <option value={item.deviceId} key={idx}>
                {item.label}
              </option>
            ))}
        </select>
        <div>username : </div>
      </div>
    </>
  );
};

const UserImageWrapper = styled.div`
  border-radius: 10em;
  width: 50px;
  overflow: hidden;

  img {
    width: inherit;
    object-fit: cover;
  }
`;

export default VoiceRoom;
