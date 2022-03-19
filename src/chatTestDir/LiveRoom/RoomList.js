import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// openvidu Info
const RoomList = () => {
  const [roomList, setRoomList] = useState(null);

  const [fakeRole, setFakeRole] = useState('PUBLISHER');

  const navigate = useNavigate();

  useEffect(() => {
    getChatRoomList().then((r) => r);
  }, []);

  // 방 목록 가져오기
  const getChatRoomList = async () => {
    await axios.get('http://localhost:8080/api/chat/rooms').then((res) => {
      const rooms = res.data;
      console.log(rooms);
      setRoomList(rooms);
    });
  };

  // 방 입장
  const handleEnterRoom = (
    roomId,
    roomName,
    moderator,
    role,
    maxParticipantCount,
  ) => {
    // 해당 페이지 이동과 동시에 구독자 목록을 같이 담아 보내준다.
    setTimeout(() =>
      navigate(`/room/${roomId}`, {
        state: { roomId, roomName, role, maxParticipantCount },
      }),
    );
  };
  const createRoom = () => {
    navigate('/room/create');
  };

  const removeAllRoom = async () => {
    await axios
      .delete('http://localhost:8080/api/chat/rooms/del/all')
      .then((res) => console.log(res));
    console.log('모두 삭제!');
  };

  const changeRole = () => {
    if (fakeRole === 'PUBLISHER') {
      setFakeRole('SUBSCRIBER');
    } else {
      setFakeRole('PUBLISHER');
    }
  };

  return (
    <>
      <p>실시간 토론방 리스트</p>
      <button onClick={changeRole}>Role 변경</button>
      <div>{fakeRole}</div>
      <hr />
      <div>
        {roomList &&
          roomList.map((room, idx) => {
            return (
              <div
                key={idx}
                onClick={() =>
                  handleEnterRoom(
                    room.roomId,
                    room.roomName,
                    room.moderator,
                    fakeRole,
                    room.maxParticipantCount,
                  )
                }
              >
                방제목 : {room.roomName} / 방장 : {room.moderator}
              </div>
            );
          })}
      </div>
      <button onClick={createRoom}>방 만들기</button>
      <button onClick={removeAllRoom}>방 지우기</button>
    </>
  );
};

export default RoomList;
