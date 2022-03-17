import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { keyframes } from 'styled-components';

const Nav = (props) => {
  const [show, setShow] = useState(false);
  const [rot, setRot] = useState(false);

  const showSpeedDialMenu = () => {
    setShow(!show);
    setRot(!rot);
    console.log(rot);
  };
  return (
    <NavWrapper>
      {show && (
        <SpeedDialMenu show={show}>
          <div className="leftMenu">일반토론</div>
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
          <Link to="/">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6585 8.20153L9.6585 2.07653C9.28148 1.74663 8.71852 1.74663 8.3415 2.07652L1.3415 8.20153C1.12448 8.39141 1 8.66574 1 8.9541V17.5003C1 18.0526 1.44772 18.5003 2 18.5003H6C6.55228 18.5003 7 18.0526 7 17.5003V13.5003C7 12.948 7.44772 12.5003 8 12.5003H10C10.5523 12.5003 11 12.948 11 13.5003V17.5003C11 18.0526 11.4477 18.5003 12 18.5003H16C16.5523 18.5003 17 18.0526 17 17.5003V8.9541C17 8.66574 16.8755 8.39141 16.6585 8.20153Z"
                stroke="#4F4F4F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div>
          <Link to="/search">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                stroke="#4F4F4F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 15L21 21"
                stroke="#4F4F4F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17V16C8.44772 16 8 16.4477 8 17H9ZM15 17H16C16 16.4477 15.5523 16 15 16V17ZM9 18H15V16H9V18ZM14 17V18H16V17H14ZM10 18V17H8V18H10ZM12 20C10.8954 20 10 19.1046 10 18H8C8 20.2091 9.79086 22 12 22V20ZM14 18C14 19.1046 13.1046 20 12 20V22C14.2091 22 16 20.2091 16 18H14Z"
              fill="#4F4F4F"
            />
            <path
              d="M4.29289 14.7071L3.58579 14L3.58579 14L4.29289 14.7071ZM4.80372 14.1963L5.51082 14.9034L5.51082 14.9034L4.80372 14.1963ZM19.1963 14.1963L19.9034 13.4892L19.9034 13.4892L19.1963 14.1963ZM19.7071 14.7071L20.4142 14L20.4142 14L19.7071 14.7071ZM12 3L12 4L12 3ZM19 16H5V18H19V16ZM5 16V15.4142H3V16H5ZM5 15.4142L5.51082 14.9034L4.09661 13.4892L3.58579 14L5 15.4142ZM6 13.7224V10H4V13.7224H6ZM18 10V13.7224H20V10H18ZM18.4892 14.9034L19 15.4142L20.4142 14L19.9034 13.4892L18.4892 14.9034ZM19 15.4142V16H21V15.4142H19ZM19 15.4142L19 15.4142H21C21 14.8838 20.7893 14.3751 20.4142 14L19 15.4142ZM18 13.7224C18 14.1653 18.176 14.5901 18.4892 14.9034L19.9034 13.4892C19.9653 13.551 20 13.6349 20 13.7224H18ZM20 10C20 5.58171 16.4183 1.99999 12 2L12 4C15.3137 3.99999 18 6.68629 18 10H20ZM6 10C6 6.6863 8.68628 4.00001 12 4L12 2C7.58171 2.00001 4 5.58173 4 10H6ZM5.51082 14.9034C5.82404 14.5902 6 14.1654 6 13.7224H4C4 13.635 4.03475 13.5511 4.09661 13.4892L5.51082 14.9034ZM5 15.4142H5L3.58579 14C3.21071 14.3751 3 14.8838 3 15.4142H5ZM5 16H3C3 17.1046 3.89543 18 5 18V16ZM19 18C20.1046 18 21 17.1046 21 16H19V18Z"
              fill="#4F4F4F"
            />
          </svg>
        </div>
        <div>
          <Link to="/myaccount">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 21.5C5 17.634 8.13401 14.5 12 14.5C15.866 14.5 19 17.634 19 21.5"
                stroke="#4F4F4F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z"
                stroke="#4F4F4F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </MenuWrapper>
    </NavWrapper>
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
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
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

export default Nav;
