import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';

const Chat = () => {
  const [stream, setStream] = useState(null);
  const [microphone, setMicrophone] = useState(null);
  useEffect(() => {
    // connect();
    connectAudio().then((r) => r);
    getMicrophone().then((r) => r);
  }, []);
  const myVoice = useRef();
  const inputRef = useRef();

  const socket = new SockJS('http://localhost:8080/ws-stomp'); // 백앤드 엔드포인트 연결
  const stomp = Stomp.over(socket); // sprint boot가 stomp 프로토콜 방식이니 프론트에서도 stomp 프로토콜 위에 sockJS가 돌아가도록 인자로 넣어준다.
  stomp.connect({}, (frame) => {
    console.log('CONNECTED FRAME =======> ', frame);
    stomp.subscribe('/topic/greetings', (greetings) => {
      console.log(JSON.parse(greetings.body).content);
    });
  });

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

  return (
    <>
      <div>실시간 채팅방</div>
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

export default Chat;
