import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// export const setVh = () => {
//   const vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty('--vh', `${vh}px`);
// };

const DeviceDetector = ({ children }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);
  return isMobile ? (
    <>{children}</>
  ) : (
    <>
      <TitleWrapper className={active && 'active'}>
        <InnerWrapper className={active && 'active'}>
          <SubTitle className={active && 'active'}>일상적 토론의 시작</SubTitle>
          <MainTitle className={active && 'active'}>보일러 플레이트</MainTitle>
          <DownloadButton className={active && 'active'}>
            <div>다운로드</div>
          </DownloadButton>
        </InnerWrapper>
      </TitleWrapper>
      <WebViewWrapper>
        <ClayPhone>{children}</ClayPhone>
      </WebViewWrapper>
    </>
  );
};

DeviceDetector.propTypes = {
  children: PropTypes.any,
};

const InnerWrapper = styled.div`
  overflow: hidden;
  margin-left: 17px;
`;
const DownloadButton = styled.div`
  color: #fff;
  width: 100%;
  background-color: #6e6bf0;
  border-radius: 10px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  transition: all 0.5s ease-in-out 2.2s;
  opacity: 0;

  > div {
    font-size: 17px;
    font-weight: 700;
    color: #fff;
  }

  &.active {
    opacity: 1;
  }
`;
const SubTitle = styled.div`
  font-size: 23px;
  font-weight: 600;
  color: #6e6bf0;
  opacity: 0;
  transition: all 0.5s ease-in-out 1.5s;

  &.active {
    opacity: 1;
  }
`;

const MainTitle = styled.div`
  margin-top: 8px;
  font-size: 35px;
  font-weight: 700;
  color: #6e6bf0;
  transition: all 1s ease-in-out 1.8s;
  opacity: 0;
  transform: translateX(-250px);

  &.active {
    transform: translateX(0);
    opacity: 1;
  }
`;

const TitleWrapper = styled.div`
  border-left: 2px solid #6e6bf0;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  transition: all 1s ease 0.5s;
  height: 0;

  &.active {
    height: 70px;
  }
`;
const WebViewWrapper = styled.div`
  background-image: url(/asset/image/clay_phone.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 450px;
  height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 45px;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
`;
const ClayPhone = styled.div`
  position: absolute;
  //max-width: 400px;
  width: calc(100% - 30px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: calc(100% - 30px);
  border-radius: 35px;
  overflow: hidden;

  *::-webkit-scrollbar {
    display: none;
  }
`;

export default DeviceDetector;
