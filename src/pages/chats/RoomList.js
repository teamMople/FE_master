import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { joinRoomAsync } from '../../modules/chat';
import {
  getLiveBoardListAsync,
  selectedLiveBoardList,
} from '../../modules/boards';

const RoomList = () => {
  const roomList = useSelector(selectedLiveBoardList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getChatRoomList();
  }, []);

  // 방 목록 가져오기
  const getChatRoomList = () => {
    dispatch(getLiveBoardListAsync());
  };
  // 방 입장
  const handleEnterRoom = async (
    roomId,
    roomName,
    moderatorNickname,
    participantCount,
    role,
  ) => {
    const nickname = localStorage.getItem('nickname');
    const data = {
      roomId: roomId,
      memberName: nickname,
      role: role,
      participantCount: participantCount,
    };
    await dispatch(
      joinRoomAsync({
        data,
        memberName: nickname,
        role: role,
      }),
    )
      .then((res) => navigate(`/room/${res.payload.roomId}`))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <p>실시간 토론방 리스트</p>
      <hr />
      <div>
        {roomList.data &&
          roomList.data.map((room, idx) => {
            return (
              <div
                style={{
                  padding: '10px 24px ',
                  borderBottom: '1px solid #ddd',
                }}
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
    </>
  );
};

export default RoomList;
