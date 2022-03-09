import React, { useState } from 'react';
import axios from 'axios';

const CreateChatRoom = () => {
  const [roomName, setRoomName] = useState(null);
  // const [memberCount, setMemberCount] = useState(2);

  const createRoom = () => {
    if (roomName === '') {
      alert('방 제목을 입력하세요!');
      return;
    }
    const data = {
      name: roomName,
    };
    axios
      .post('', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };

  // const handleMember = (param) => {
  //   const { increase, decrease } = param;
  //
  //   if (param[increase]) {
  //     setMemberCount((prev) => prev - 1);
  //   } else {
  //     setMemberCount((prev) => prev + 1);
  //   }
  // };

  return (
    <>
      <div>채팅방 만들기</div>
      <select>
        <option>카테고리</option>
      </select>
      <input
        onChange={handleChangeValue}
        placeholder="방 제목을 입력해주세요."
      />
      <textarea placeholder="토론하고 싶은 내용을 작성해주세요." />
      <div>
        참여인원
        {/*<button onClick={handleMember}>-</button>*/}
        {/*<button onClick={handleMember}>+</button>*/}
      </div>
      <button onClick={createRoom}>만들기</button>
    </>
  );
};

export default CreateChatRoom;
