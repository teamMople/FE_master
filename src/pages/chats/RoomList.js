import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setJoinRoomStatus } from '../../modules/chat';

// openvidu Info
const RoomList = () => {
  const [roomList, setRoomList] = useState(null);

  // 임시
  const [accessToken, setAccessToken] = useState(undefined);
  const [memberName, setMemberName] = useState(undefined);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getChatRoomList().then((r) => r);
  }, []);

  // 방 목록 가져오기
  const getChatRoomList = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/chat/rooms/onair`)
      .then((res) => {
        const rooms = res.data;
        console.log(rooms);
        setRoomList(rooms);
      });
  };

  // 방 입장
  const handleEnterRoom = async (
    roomId,
    roomName,
    moderatorNickname,
    participantCount,
    role,
  ) => {
    //!Todo api 요청 보내기 무조건!!
    const data = {
      roomId: roomId,
      memberName: memberName,
      role: role,
      participantCount: participantCount,
    };
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/api/chat/room/join`,
        data,
        headers,
      )
      .then(async (res) => {
        console.log('🚁 join response(room list) =====> ', res.data);
        // 해당 페이지 이동과 동시에 구독자 목록을 같이 담아 보내준다.
        const status = {
          role: role,
          roomId: res.data.roomId,
          roomName: res.data.roomName,
          category: res.data.category,
          moderatorId: res.data.moderatorId,
          moderatorNickname: res.data.moderatorNickname,
          maxParticipantCount: res.data.maxParticipantCount,
          content: res.data.content,
          isPrivate: res.data.isPrivate,
          agreeCount: res.data.agreeCount,
          disagreeCount: res.data.disagreeCount,
          onAir: res.data.onAir,
          createdAt: res.data.createdAt,
          memberAgreed: res.data.memberAgreed,
          memberDisagreed: res.data.memberDisagreed,
          memberName: memberName,
          accessToken: accessToken,
        };
        dispatch(setJoinRoomStatus(status));
        navigate(`/room/${roomId}`);
      })
      .catch((error) => console.error(error));
  };
  // const navigateRoom = (
  //   roomId,
  //   roomName,
  //   role,
  //   maxParticipantCount,
  //   headerToken,
  //   memberName,
  //   agree,
  //   disagree,
  // ) => {
  //   navigate(`/room/${roomId}`, {
  //     state: {
  //       roomId: roomId,
  //       roomName: roomName,
  //       role: role,
  //       maxParticipantCount: maxParticipantCount,
  //       headerToken: headerToken,
  //       memberName: memberName,
  //       agree: agree,
  //       disagree: disagree,
  //     },
  //   });
  // };
  const createRoom = () => {
    navigate('/room/create');
  };

  const removeAllRoom = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/chat/rooms/del/all`)
      .then((res) => console.log(res));
    console.log('모두 삭제!');
  };

  // 임시 사용자 선택
  const user1 = () => {
    setAccessToken(
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiQGIuY29tIiwic2NvcGVzIjpbIlVTRVIiXSwiaXNzIjoiMyIsImF1ZCI6ImIiLCJpYXQiOjE2NDgwNTY1MzYsImV4cCI6MTY0ODEyODUzNn0.3OSu4Ged99L6H_kHk4DWX0Rq9Ooht7ZLh9E24ZvO9yMc0_Gbdi2GcnCg2bdl929G8I-WQh_kP2qeITS908PCOA',
    );
    setMemberName('b');
  };

  const user2 = () => {
    setAccessToken(
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjQGMuY29tIiwic2NvcGVzIjpbIlVTRVIiXSwiaXNzIjoiNCIsImF1ZCI6ImMiLCJpYXQiOjE2NDgwNTY1NTQsImV4cCI6MTY0ODEyODU1NH0.U1jTHBqEIft-E-57K3_Gn5Ydq9NUiE_2PPCIPk684oRn993Efh2DIjp0R-tKjUqiTPsPsa7gQpr3c58MP0cOBA',
    );
    setMemberName('c');
  };
  return (
    <>
      <p>실시간 토론방 리스트</p>
      <hr />
      <div>멤버이름 : {memberName}</div>
      <button onClick={user1}>사용자 1</button>
      <button onClick={user2}>사용자 2</button>
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
                    room.moderatorNickname,
                    room.maxParticipantCount,
                    'PUBLISHER',
                  )
                }
              >
                방제목 : {room.roomName} / 방장 : {room.moderatorNickname}
              </div>
            );
          })}
      </div>
      <button
        onClick={createRoom}
        style={{ position: 'fixed', right: 0, top: 50 }}
      >
        방 만들기
      </button>
      <button
        onClick={removeAllRoom}
        style={{ position: 'fixed', right: 0, top: 100 }}
      >
        방 지우기
      </button>
    </>
  );
};

export default RoomList;
