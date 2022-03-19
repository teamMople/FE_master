import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { keyframes } from 'styled-components';

const Nav = (props) => {
  const [show, setShow] = useState(false);
  const [rot, setRot] = useState(false);

  const navigate = useNavigate();

  const showSpeedDialMenu = () => {
    setShow(!show);
    setRot(!rot);
    console.log(rot);
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
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M9 21H4C3.44772 21 3 20.5523 3 20V12.4142C3 12.149 3.10536 11.8946 3.29289 11.7071L11.2929 3.70711C11.6834 3.31658 12.3166 3.31658 12.7071 3.70711L20.7071 11.7071C20.8946 11.8946 21 12.149 21 12.4142V20C21 20.5523 20.5523 21 20 21H15M9 21H15M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </Svg>
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
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6.5"
                  stroke="#4F4F4F"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <Path
                  d="M19.4697 20.5303C19.7626 20.8232 20.2374 20.8232 20.5303 20.5303C20.8232 20.2374 20.8232 19.7626 20.5303 19.4697L19.4697 20.5303ZM20.5303 19.4697L15.5303 14.4697L14.4697 15.5303L19.4697 20.5303L20.5303 19.4697Z"
                  fill="#4F4F4F"
                />
              </svg>
            </Link>
          </div>
          <div>
            <Link to="/alarm">
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M9.5 19C8.89555 19 7.01237 19 5.61714 19C4.87375 19 4.39116 18.2177 4.72361 17.5528L5.57771 15.8446C5.85542 15.2892 6 14.6774 6 14.0564C6 13.2867 6 12.1434 6 11C6 9 7 5 12 5C17 5 18 9 18 11C18 12.1434 18 13.2867 18 14.0564C18 14.6774 18.1446 15.2892 18.4223 15.8446L19.2764 17.5528C19.6088 18.2177 19.1253 19 18.382 19H14.5M9.5 19C9.5 21 10.5 22 12 22C13.5 22 14.5 21 14.5 19M9.5 19C11.0621 19 14.5 19 14.5 19"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <Path
                  d="M12 5V3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Link>
          </div>
          <div>
            <Link to="/myaccount">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2817 9.34661L10.8917 8.70597C10.6393 8.85964 10.5006 9.14722 10.5376 9.44043C10.5746 9.73364 10.7803 9.97781 11.063 10.064L11.2817 9.34661ZM6.6086 9.34661L6.82734 10.064C7.11002 9.97781 7.31573 9.73364 7.3527 9.44043C7.38967 9.14722 7.25101 8.85964 6.99857 8.70597L6.6086 9.34661ZM1.0068 16.002L0.262541 15.9094L1.0068 16.002ZM16.8835 16.002L17.6278 15.9094V15.9094L16.8835 16.002ZM12.6952 5.5C12.6952 6.85717 11.9747 8.04675 10.8917 8.70597L11.6717 9.98724C13.1831 9.06719 14.1952 7.40213 14.1952 5.5H12.6952ZM8.94515 1.75C11.0162 1.75 12.6952 3.42893 12.6952 5.5H14.1952C14.1952 2.6005 11.8446 0.25 8.94515 0.25V1.75ZM5.19515 5.5C5.19515 3.42893 6.87409 1.75 8.94515 1.75V0.25C6.04566 0.25 3.69515 2.6005 3.69515 5.5H5.19515ZM6.99857 8.70597C5.91564 8.04675 5.19515 6.85717 5.19515 5.5H3.69515C3.69515 7.40213 4.7072 9.06719 6.21862 9.98724L6.99857 8.70597ZM6.38985 8.62921C3.14027 9.62005 0.69304 12.45 0.262541 15.9094L1.75106 16.0946C2.10728 13.2322 4.13475 10.885 6.82734 10.064L6.38985 8.62921ZM0.262541 15.9094C0.130886 16.9673 1.00717 17.75 1.94515 17.75V16.25C1.87309 16.25 1.8166 16.2207 1.78385 16.1866C1.75503 16.1566 1.74688 16.1282 1.75106 16.0946L0.262541 15.9094ZM1.94515 17.75H15.9452V16.25H1.94515V17.75ZM15.9452 17.75C16.8831 17.75 17.7594 16.9673 17.6278 15.9094L16.1392 16.0946C16.1434 16.1282 16.1353 16.1567 16.1065 16.1866C16.0737 16.2207 16.0172 16.25 15.9452 16.25V17.75ZM17.6278 15.9094C17.1973 12.45 14.75 9.62005 11.5005 8.62921L11.063 10.064C13.7556 10.885 15.783 13.2322 16.1392 16.0946L17.6278 15.9094Z"
                  fill="#4F4F4F"
                />
              </svg>
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
  position: absolute;
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

const Svg = styled.svg``;

const Path = styled.path`
  stroke: ${({ theme }) => theme.colors.black};

  &:hover {
    stroke: ${({ theme }) => theme.colors.primaryYellow};
  }
`;

export default Nav;
