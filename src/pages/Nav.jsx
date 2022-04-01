import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { keyframes } from 'styled-components';
import CreateRoom from './chats/views/CreateRoom/CreateRoom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCreateRoomState,
  selectOpenRoomState,
  selectRoomState,
  setCreateRoomNextStep,
  setCreateRoomSetting,
  setOpenCreateRoom,
  setOpenRoomState,
} from '../modules/chat';

const Nav = (props) => {
  const [showNav, setShowNav] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [rot, setRot] = useState(false);

  const openRoomState = useSelector(selectOpenRoomState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate('/');
  };
  const goSearch = () => {
    navigate('/');
  };
  const goNoti = () => {
    navigate('/');
  };
  const goMyPage = () => {
    navigate('/');
  };

  let location = useLocation();

  const roomState = useSelector(selectRoomState);

  const locationArray = [
    '/',
    '/login',
    '/signup',
    '/welcome',
    '/list',
    '/settings',
    '/editmyprofile',
    '/createboard',
    `/room/${roomState.roomId}`,
  ];

  useEffect(() => {
    if (locationArray.indexOf(window.location.pathname) !== -1) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    return;
  }, [location]);

  const createRoomState = useSelector(selectCreateRoomState);
  const handleOpenCreateRoom = () => {
    dispatch(setOpenRoomState(false));
    if (!openRoomState) {
      setOpenCreateRoom(false);
    }
    if (createRoomState.openCreateRoom) {
      setShowMenu(false);
    }
    dispatch(setOpenCreateRoom(!createRoomState.openCreateRoom));
    // setOpenCreateRoom(!openCreateRoom);
  };
  const handleNextStep = () => {
    dispatch(setCreateRoomNextStep(true));
    dispatch(setOpenCreateRoom(false));
    dispatch(setCreateRoomSetting(false));
    setShowMenu(false);
  };
  const handleSetting = () => {
    dispatch(setOpenCreateRoom(true));
    dispatch(setCreateRoomSetting(true));
    setShowMenu(false);
  };
  const handleClickLeftArrow = () => {
    dispatch(setCreateRoomNextStep(false));
    dispatch(setOpenCreateRoom(false));
    dispatch(setCreateRoomSetting(false));
    setShowMenu(false);
  };

  const showSpeedDialMenu = () => {
    setShowMenu(!showMenu);
    dispatch(setOpenCreateRoom(false));
    dispatch(setCreateRoomSetting(false));
  };
  const handleClickHeaderSubLeft = () => {
    setShowMenu(false);
    dispatch(setOpenCreateRoom(false));
    dispatch(setCreateRoomSetting(false));
  };

  return (
    <>
      <NavWrapper active={showNav} {...props}>
        {showMenu && (
          <SpeedDialMenu>
            <div
              className={showMenu && 'leftMenu'}
              onClick={() => {
                navigate('/createboard');
                setShowMenu(false);
                setOpenCreateRoom(false);
              }}
            >
              일반토론
            </div>
            <div
              className={showMenu && 'rightMenu'}
              onClick={handleOpenCreateRoom}
            >
              LIVE토론
            </div>
          </SpeedDialMenu>
        )}
        <SpeedDial rot={rot} onClick={showSpeedDialMenu}>
          <div>
            <img src="/asset/icons/Add_Plus.svg" />
          </div>
        </SpeedDial>

        <MenuWrapper>
          <div>
            <Link to="/home">
              <Icon src="/asset/icons/Home.svg" />
            </Link>
          </div>
          <div>
            <Link to="/search">
              <Icon src="/asset/icons/Search_Magnifying_Glass.svg" />
            </Link>
          </div>
          <div>
            <Link to="/alarm">
              <Icon src="/asset/icons/Bell.svg" />
            </Link>
          </div>
          <div>
            <Link to="/myaccount">
              <Icon src="/asset/icons/User.svg" />
            </Link>
          </div>
        </MenuWrapper>
      </NavWrapper>
      <CreateRoom
        show={createRoomState.openCreateRoom}
        openSetting={createRoomState.createRoomSetting}
        onClickNextStep={handleNextStep}
        nextStep={createRoomState.createRoomNextStep}
        onClickSetting={handleSetting}
        leftArrowOnClick={handleClickLeftArrow}
        onClickHeaderSubLeft={handleClickHeaderSubLeft}
      />
      <Overlay
        onClick={showSpeedDialMenu}
        className={
          showMenu
            ? 'active'
            : createRoomState.createRoomSetting
            ? 'overActive'
            : ''
        }
      />
    </>
    // document.getElementById('create_room'),
  );
};

//!Todo 디자인 시안 나오면 체계적으로 정리 예정
const spinClockwise = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
`;

const spinCounterClockwise = keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0;
  z-index: 9;
  visibility: hidden;
  transition: all 0.2s ease;

  &.active {
    opacity: 0.5;
    visibility: visible;
  }

  &.overActive {
    z-index: 11;
    opacity: 0.5;
    visibility: visible;
  }
`;

const SpeedDialMenu = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  justify-content: space-evenly;
  transition: all 0.2s ease;
  column-gap: 1.5px;

  > div {
    width: 80px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    &.leftMenu {
      border-radius: 30px 4px 1px 1px;
    }

    &.rightMenu {
      border-radius: 4px 30px 1px 1px;
    }
    &:hover,
    &:active,
    &:focus {
      transition: all 0.2s ease;
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.primaryYellow};
    }
  }
`;

const NavWrapper = styled.div`
  //position: fixed;
  position: relative;
  z-index: 11;
  //z-index: 99;
  width: 100%;
  bottom: 0;
  display: ${(props) => (props.active ? 'flex' : 'none')};
  justify-content: space-around;
`;
const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 54px;
  background-color: ${({ theme }) => theme.colors.white};

  > div {
    width: 25%;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SpeedDial = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primaryYellow};

  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 10em;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.rot
      ? css`
          transform: rotate(90deg);
          animation-name: ${spinClockwise};
        `
      : css`
          transform: rotate(0deg);
          animation-name: ${spinCounterClockwise};
        `}

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50%;

  cursor: pointer;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  mask: url('${(props) => props.src}');
  mask-repeat: no-repeat;
  mask-position: center;
  background: ${({ theme }) => theme.colors.black};

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primaryYellow};
  }
`;

export default Nav;
