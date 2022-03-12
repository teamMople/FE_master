import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Textarea, SelectTab, DropdownSelect } from 'components';
import { useNavigate } from 'react-router-dom';

const CreateChatRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [memberCount, setMemberCount] = useState(2);
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

  const createRoom = () => {
    // if (roomName === '') {
    //   alert('방 제목을 입력하세요!');
    //   return;
    // }
    const data = {
      moderator: 'TestUser',
      roomName: roomName,
    };
    axios
      .post('http://localhost:8080/api/chat/room', data)
      .then((res) => {
        console.log(res);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setRoomName(value);
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
      <Textarea fluid placeholder="토론하고 싶은 내용을 작성해주세요." />
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
    </>
  );
};

const SelectTabBox = styled.div`
  display: flex;
  align-items: center;
`;

export default CreateChatRoom;
