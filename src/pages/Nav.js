import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { keyframes } from 'styled-components';
import { Grid } from 'components';

const Nav = (props) => {
  const [show, setShow] = useState(false);
  const [rot, setRot] = useState(false);

  const navigate = useNavigate();

  const showSpeedDialMenu = () => {
    setShow(!show);
    setRot(!rot);
    console.log(rot);
  };

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
  return (
    <>
      {show && <Overlay show={show} />}
      <NavWrapper {...props}>
        {show && (
          <SpeedDialMenu show={show}>
            <div
              className="leftMenu"
              onClick={() => {
                navigate('/createboard');
                setShow(false);
              }}
            >
              일반토론
            </div>
            <div className="rightMenu">LIVE토론</div>
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
    </>
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
  opacity: 0.5;
  ${(props) =>
    props.show
      ? css`
          display: flex;
          transition: 1s ease-in;
        `
      : css`
          display: none;
          transition: 1s ease-in;
        `};
`;

const SpeedDialMenu = styled.div`
  ${(props) =>
    props.show
      ? css`
          display: flex;
          transition: 1s ease-in;
        `
      : css`
          display: none;
          transition: 1s ease-in;
        `}
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  width: 150px;
  justify-content: space-evenly;
  transition: all 0.5s ease;

  > .leftMenu {
    width: 76px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    font-weight: 500;
    background-color: #fff;
    border-radius: 50px 4px 1px 1px;
    margin-right: 1.5px;
  }

  > .leftMenu:hover {
    color: #fff;
    background-color: #fade86;
  }

  > .rightMenu {
    width: 76px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    font-weight: 500;
    background-color: #fff;
    border-radius: 1px 50px 1px 4px;
    margin-left: 1.5px;
  }

  > .rightMenu:hover {
    color: #fff;
    background-color: #fade86;
  }
`;

const NavWrapper = styled.div`
  position: fixed;
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
  background-color: #fade86;

  border: 2px solid #fff;
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
