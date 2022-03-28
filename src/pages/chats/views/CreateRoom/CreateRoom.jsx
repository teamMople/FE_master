import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
  Textarea,
  Header,
  Grid,
  Text,
  StandardInput,
  Button,
} from 'components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  createRoomAsync,
  joinRoomAsync,
  setCreateRoomNextStep,
  setCreateRoomSetting,
  setOpenCreateRoom,
  setOpenRoomState,
} from '../../../../modules/chat';
import { SliderStepper } from '../../component';
import PropTypes from 'prop-types';
import HeaderSub from '../../component/HeaderSub';
import {
  BodyWrapper,
  ContentWrapper,
  CustomWrapper,
  ParticipantCountWrapper,
  SelectOption,
  SelectOptionWrapper,
  SlideUpWrapper,
  TextareaWrapper,
} from './style';

const CreateRoom = ({
  show,
  nextStep,
  onClickNextStep,
  onClickSetting,
  openSetting,
  leftArrowOnClick,
  onClickHeaderSubLeft,
}) => {
  const options = [
    { value: '일상생활', label: '일생생활' },
    { value: '직장생활', label: '직장생활' },
    { value: '학교생활', label: '학교생활' },
    { value: '시사이슈', label: '시사/이슈' },
    { value: '관계심리', label: '관계/심리' },
    { value: '기타', label: '기타' },
  ];
  const [roomName, setRoomName] = useState('');
  const [memberCount, setMemberCount] = useState(2);
  const [content, setContent] = useState('');
  const [moderator, setModerator] = useState('TestUser');
  const [textLength, setTextLength] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  const [value, setValue] = useState(options[0].value);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickOption = (index) => {
    setCurrentIndex(index);
    setValue(options[index].value);
  };
  const initCreateRoom = () => {
    dispatch(setOpenCreateRoom(false));
    dispatch(setCreateRoomNextStep(false));
    dispatch(setCreateRoomSetting(false));
    //!Todo 왜 초기화가 제목만 안돼?
    setRoomName('');
    setContent('');
    setValue(options[0].value);
    setCurrentIndex(0);
    setMemberCount(2);
    setTextLength(0);
  };
  const createRoom = async () => {
    dispatch(setOpenRoomState(true));
    initCreateRoom();
    const data = {
      roomName: roomName,
      category: value,
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

  const handleMember = (e) => {
    // if (param === 'increase' && memberCount < 10) {
    //   setMemberCount((prev) => prev + 1);
    // } else if (param === 'decrease' && memberCount > 2) {
    //   setMemberCount((prev) => prev - 1);
    // }
    setMemberCount(e.target.value);
    console.log(e.target.value);
  };

  console.log(openSetting);
  return (
    <>
      <>
        <SlideUpWrapper className={show && 'active'}>
          <HeaderSub
            label={'라이브 채팅방 설정'}
            onClickRight={onClickNextStep}
            onClickLeft={
              openSetting ? !onClickHeaderSubLeft : onClickHeaderSubLeft
            }
          />
          <ContentWrapper>
            <Text small>카테고리 선택</Text>
            <SelectOptionWrapper>
              {options.map((option, idx) => (
                <SelectOption
                  key={idx}
                  onClick={() => handleClickOption(idx)}
                  className={idx === currentIndex && 'active'}
                >
                  {option.label}
                </SelectOption>
              ))}
            </SelectOptionWrapper>
            {/*<DropdownSelect
            placeholder="카테고리를 선택해주세요"
            color={themeContext.colors.lightGray}
            onChange={setSelectedOption}
            options={options}
          />*/}
            <ParticipantCountWrapper>
              <div>
                <Text small>참여인원</Text>
                <Text tiny color={themeContext.colors.blue}>
                  {memberCount}명
                </Text>
              </div>
              <SliderStepper value={memberCount} onChange={handleMember} />
            </ParticipantCountWrapper>
            {/*<SetMemberCount*/}
            {/*  disabledDecrease={memberCount === 2}*/}
            {/*  disabledIncrease={memberCount === 10}*/}
            {/*  count={memberCount}*/}
            {/*  onClickDecrease={() => handleMember('decrease')}*/}
            {/*  onClickIncrease={() => handleMember('increase')}*/}
            {/*/>*/}
          </ContentWrapper>
        </SlideUpWrapper>
        {/* ================= */}
        <CustomWrapper className={nextStep && 'active'}>
          <Grid padding="8px 24px">
            <Header
              label="라이브 채팅방 개설"
              leftArrow
              leftArrowOnClick={leftArrowOnClick}
              disabled={roomName === '' || content === ''}
              rightButtonRender={{ label: '완료', onClickButton: createRoom }}
            />
          </Grid>

          {/*<DropdownSelect*/}
          {/*  placeholder="카테고리를 선택해주세요"*/}
          {/*  color={themeContext.colors.lightGray}*/}
          {/*  onChange={setSelectedOption}*/}
          {/*  options={options}*/}
          {/*/>*/}
          <BodyWrapper>
            <Button
              size={'small'}
              shape={'rounded'}
              color={themeContext.colors.black}
              onClick={onClickSetting}
            >
              라이브채팅설정
            </Button>
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
          </BodyWrapper>
        </CustomWrapper>
      </>
    </>
    // document.getElementById('create_room'),
  );
};

CreateRoom.propTypes = {
  show: PropTypes.bool,
  nextStep: PropTypes.bool,
  onClickNextStep: PropTypes.func,
  onClickSetting: PropTypes.func,
  openSetting: PropTypes.bool,
  leftArrowOnClick: PropTypes.func,
  onClickHeaderSubLeft: PropTypes.func,
};

export default CreateRoom;
