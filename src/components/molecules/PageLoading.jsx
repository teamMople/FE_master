import React from 'react';
import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';

const PageLoading = () => {
  return createPortal(
    <>
      <BackDrop />
      <LogoWrapper>
        <LogoYellow>
          <img src={'/asset/logo/logo_yellow.svg'} alt="logo" />
        </LogoYellow>
        <LogoWhite>
          <img src={'/asset/logo/logo_white.svg'} alt="logo" />
        </LogoWhite>
        <LogoBlue>
          <img src={'/asset/logo/logo_blue.svg'} alt="logo" />
        </LogoBlue>
      </LogoWrapper>
    </>,
    document.getElementById('page_loading'),
  );
};

const BackDrop = styled.div`
  position: fixed;
  height: 100%;
  z-index: 20;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease;
  opacity: 0.7;
`;
const LogoWrapper = styled.div`
  position: fixed;
  //height: 100%;
  z-index: 21;
  //width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;
const dropYellow = keyframes`
  0%{
    transform: translate(25px,-50px);
    opacity: 0;
  }
  50%{
    transform: translate(25px,0);
    opacity: 1;
  }  
  75%{
    transform: translate(25px,0);
    opacity: 1;
  }
  100%{
    transform: translate(25px,0);
    opacity: 0;
  }
`;
const dropBlue = keyframes`
  0%{
    transform: translate(-25px,-50px);
    opacity: 0;
  }
  50%{
    transform: translate(-25px,0);
    opacity: 1;
  }
  75%{
    transform: translate(-25px,0);
    opacity: 1;
  }
  100%{
    transform: translate(-25px,0);
    opacity: 0;
  }
`;
const dropWhite = keyframes`
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  65%{
    opacity: 1;
  }
  75%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;
const LogoYellow = styled.div`
  animation-name: ${dropYellow};
  animation-duration: 1.5s;
  //animation-delay: 0.2s;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  transform: translateX(25px);
  opacity: 0;
  > img {
    height: 50px;
    width: 50px;
  }
`;
const LogoBlue = styled.div`
  animation-name: ${dropBlue};
  animation-duration: 1.5s;
  animation-delay: 0.1s;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  transform: translateX(-25px);
  opacity: 0;
  > img {
    height: 50px;
    width: 50px;
  }
`;
const LogoWhite = styled.div`
  position: relative;
  z-index: 22;
  animation-name: ${dropWhite};
  animation-duration: 1.5s;
  animation-delay: 0.1s;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  opacity: 0;
  > img {
    height: 47px;
  }
`;

export default PageLoading;
