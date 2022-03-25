import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
  Textarea,
  DropdownSelect,
  Header,
  Wrapper,
  Grid,
  Text,
  StandardInput,
} from 'components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createRoomAsync, joinRoomAsync } from '../../modules/chat';
import { SetMemberCount } from './component';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [memberCount, setMemberCount] = useState(10);
  const [content, setContent] = useState('');
  const [moderator, setModerator] = useState('TestUser');
  const [textLength, setTextLength] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  const options = [
    { value: '일상생활', label: '일생생활' },
    { value: '직장생활', label: '직장생활' },
    { value: '학교생활', label: '학교생활' },
    { value: '시사이슈', label: '시사/이슈' },
    { value: '관계심리', label: '관계/심리' },
    { value: '기타', label: '기타' },
  ];

  const createRoom = async () => {
    const data = {
      roomName: roomName,
      category: selectedOption.value,
      moderator: moderator,
      maxParticipantCount: memberCount,
      content: content,
      isPrivate: false,
    };
    const nickname = localStorage.getItem('nickname');
    await dispatch(
      createRoomAsync({ data, memberName: nickname, role: 'MODERATOR' }),
    )
      .then((res) => {
        const response = res.payload;
        navigateVoiceRoom(
          response.roomId,
          response.memberName,
          response.role,
          response.maxParticipantCount,
        );
      })
      .catch((err) => console.error(err));
  };

  const navigateVoiceRoom = async (
    roomId,
    memberName,
    role,
    maxParticipantCount,
  ) => {
    const data = {
      roomId: roomId,
      memberName: memberName,
      role: role,
      participantCount: maxParticipantCount,
    };
    await dispatch(
      joinRoomAsync({
        data,
        memberName: memberName,
        role: role,
      }),
    );
    /* await axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/api/chat/room/join`,
        data,
        headers,
      )
      .then((res) => {
        console.log('🚦 join response(create room) =====> ', res.data);
      })
      .catch((error) => console.error(error));*/
    //navigate 로 state 넘기지 말자... publisher 객체가 너무 커서 안넘어간다... 하...
    await navigate(`/room/${roomId}`, { replace: true });
  };
  const handleChangeValue = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };
  const handleChangeContent = (e) => {
    const value = e.target.value;
    if (value.length < 300) {
      setTextLength(value.length);
      setContent(value);
    }
  };

  const handleMember = (param) => {
    if (param === 'increase' && memberCount < 10) {
      setMemberCount((prev) => prev + 1);
    } else if (param === 'decrease' && memberCount > 2) {
      setMemberCount((prev) => prev - 1);
    }
  };

  return (
    <>
      <Wrapper>
        <Grid padding="8px 24px">
          <Header
            label="라이브 채팅방 개설"
            leftArrow
            disabled={
              roomName === '' || content === '' || selectedOption.value === ''
            }
            rightButtonRender={{ label: '완료', onClickButton: createRoom }}
          />
        </Grid>

        <DropdownSelect
          placeholder="카테고리를 선택해주세요"
          color={themeContext.colors.lightGray}
          onChange={setSelectedOption}
          options={options}
        />
        <BodyWrapper>
          <StandardInput
            fluid
            placeholder="제목을 입력해주세요"
            onChange={handleChangeValue}
          />
          <TextareaWrapper>
            <Textarea
              fluid
              height="200px"
              placeholder="토론하고 싶은 내용을 작성해주세요"
              onChange={handleChangeContent}
              value={content}
              lineHeight="18px"
            />
          </TextareaWrapper>
          <Text tiny right color={themeContext.colors.darkGray}>
            {textLength} / 300
          </Text>
          <Text style={{ margin: '1rem 0' }}>참여인원 설정 </Text>
          <SetMemberCount
            disabledDecrease={memberCount === 2}
            disabledIncrease={memberCount === 10}
            count={memberCount}
            onClickDecrease={() => handleMember('decrease')}
            onClickIncrease={() => handleMember('increase')}
          />
        </BodyWrapper>
      </Wrapper>
    </>
  );
};

const BodyWrapper = styled.div`
  padding: 0 24px;
`;
const TextareaWrapper = styled.div`
  padding: 10px 0;
`;

export default CreateRoom;
