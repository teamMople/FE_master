import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// export const setVh = () => {
//   const vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty('--vh', `${vh}px`);
// };

const DeviceDetector = ({ children }) => {
  return isMobile ? (
    <>{children}</>
  ) : (
    <WebViewWrapper>
      <ClayPhone>{children}</ClayPhone>
    </WebViewWrapper>
  );
};

DeviceDetector.propTypes = {
  children: PropTypes.any,
};

const WebViewWrapper = styled.div`
  background-image: url('/asset/image/test-phone.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 395px;
  height: 800px;
  position: absolute;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
`;
const ClayPhone = styled.div`
  position: absolute;
  max-width: 375px;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: calc(100% - 20px);
  border-radius: 20px;
  overflow: hidden;
`;

export default DeviceDetector;
