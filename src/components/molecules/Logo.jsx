import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const Logo = (props) => {
  return (
    <LogoWrapper {...props}>
      <LogoShape>
        <img src="/asset/logo/logoShape.svg" />
      </LogoShape>
      <LogoText>
        <img src="/asset/logo/logoText.svg" />
      </LogoText>
    </LogoWrapper>
  );
};

const flipAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
  }
  100%{
    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoShape = styled.div`
  margin-bottom: 6px;
  animation: ${flipAnimation} 2s 1s infinite linear alternate;
`;

const LogoText = styled.div``;

export default Logo;
