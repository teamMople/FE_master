import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom';
import { over } from 'stompjs';

const ChatRoomList = () => {
  const [roomList, setRoomList] = useState(null);
  const [stomp, setStomp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getChatRoomList().then((r) => r);
  }, []);

  // 방 목록 가져오기
  const getChatRoomList = async () => {
    await axios.get('http://localhost:8080/api/chat/rooms').then((res) => {
      const rooms = res.data;
      setRoomList(rooms);
    });
  };

  // 방 입장
  const handleEnterRoom = (roomId, roomName, moderator) => {
    // navigate(`/voice/${roomId}`, { state: {roomName: roomName, userId: userId }});
    navigate(`/voice/${roomId}`, {
      state: { roomName: roomName, moderator: moderator },
    });
  };

  return (
    <>
      <p>실시간 토론방 리스트</p>
      <div>
        {roomList &&
          roomList.map((room, idx) => {
            return (
              <div
                key={idx}
                onClick={() =>
                  handleEnterRoom(room.roomId, room.roomName, room.moderator)
                }
              >
                방제목 : {room.roomName} / 방장 : {room.moderator}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChatRoomList;
