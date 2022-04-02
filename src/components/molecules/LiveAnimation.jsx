import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const LiveAnimation = ({ backgroundColor }) => {
  return (
    <LiveAnimationWrapper backgroundColor={backgroundColor}>
      <div />
      <div />
      <div />
    </LiveAnimationWrapper>
  );
};

LiveAnimation.propTypes = {
  backgroundColor: PropTypes.string,
};

const liveSignalShort = keyframes`
  0% {height: 4px;}
  100% {height: 10px;}
`;

const liveSignalLong = keyframes`
  0% {height: 8px;}
  100% {height: 16px;}
`;

const LiveAnimationWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
  > div {
    border-radius: 10em;
    width: 2px;
    background-color: ${({ theme, backgroundColor }) =>
      backgroundColor ? backgroundColor : theme.colors.black};
    &:nth-child(1) {
      height: 10px;
      animation: ${liveSignalShort} 0.3s 0.1s infinite linear alternate;
    }
    &:nth-child(2) {
      max-height: 16px;
      animation: ${liveSignalLong} 0.3s infinite linear alternate;
    }
    &:nth-child(3) {
      height: 10px;
      animation-name: ${liveSignalShort};
      animation-duration: 0.3s;
      animation-delay: 0.2s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
`;

export default LiveAnimation;
