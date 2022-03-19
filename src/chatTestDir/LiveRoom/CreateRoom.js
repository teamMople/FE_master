import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Textarea, SelectTab, DropdownSelect } from 'components';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [memberCount, setMemberCount] = useState(10);
  const [content, setContent] = useState(null);
  const [moderator, setModerator] = useState('TestUser');
  const [roomId, setRoomId] = useState(null);
  const [publisher, setPublisher] = useState(undefined);
  const navigate = useNavigate();

  const selectMenu = [{ value: '공개토론' }, { value: '비공개토론' }];
  const options = [
    { value: '일상생활', label: '일생생활' },
    { value: '직장생활', label: '직장생활' },
    { value: '학교생활', label: '학교생활' },
    { value: '시사/이슈', label: '시사/이슈' },
    { value: '관계/심리', label: '관계/심리' },
    { value: '기타', label: '기타' },
  ];

  const createRoom = async () => {
    const data = {
      moderator: moderator,
      roomName: roomName,
      content: content,
      isPrivate: false,
      maxParticipantCount: memberCount,
    };

    await axios
      .post('http://localhost:8080/api/chat/room', data)

      // 이거는 방을 만들 때!!!!!!
      .then(async (res) => {
        console.log(res.data.roomId);
        await setRoomId(res.data.roomId);
        await setRoomName(res.data.roomName);
        // navigateVoiceRoom(roomId, roomName);
        await navigateVoiceRoom(
          res.data.roomId,
          res.data.roomName,
          res.data.maxParticipantCount,
        );
        //
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log('😊😊😊️', roomName, moderator, publisher);

  const navigateVoiceRoom = (roomId, roomName, maxParticipantCount) => {
    //navigate 로 state 넘기지 말자... publisher 객체가 너무 커서 안넘어간다... 하...
    navigate(`/room/${roomId}`, {
      state: {
        roomId: roomId,
        roomName: roomName,
        role: 'MODERATOR',
        maxParticipantCount: maxParticipantCount,
      },
      replace: true,
    });
  };
  const handleChangeValue = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };
  const handleChangeContent = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const handleMember = (param) => {
    if (param === 'increase' && memberCount < 10) {
      setMemberCount((prev) => prev + 1);
    } else if (param === 'decrease' && memberCount > 2) {
      setMemberCount((prev) => prev - 1);
    }
  };

  const handleSelect = (idx) => {
    setCurrentTab(idx);
  };

  return (
    <>
      <div>토론방 개설</div>
      <SelectTabBox>
        {selectMenu.map((ele, idx) => (
          <SelectTab
            key={idx}
            active={currentTab === idx}
            onClick={() => handleSelect(idx)}
          >
            {ele.value}
          </SelectTab>
        ))}
      </SelectTabBox>
      <DropdownSelect
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <input
        onChange={handleChangeValue}
        placeholder="방 제목을 입력해주세요."
      />
      <Textarea
        fluid
        placeholder="토론하고 싶은 내용을 작성해주세요."
        onChange={handleChangeContent}
      />
      <div>
        참여인원
        {memberCount}
        <button
          disabled={memberCount === 2}
          onClick={() => handleMember('decrease')}
        >
          -
        </button>
        <button
          disabled={memberCount === 10}
          onClick={() => handleMember('increase')}
        >
          +
        </button>
      </div>
      <button onClick={createRoom} disabled={roomName === ''}>
        만들기
      </button>
      <button onClick={navigateVoiceRoom}>이동</button>
    </>
  );
};

const SelectTabBox = styled.div`
  display: flex;
  align-items: center;
`;

export default CreateRoom;
