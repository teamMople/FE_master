import React from 'react';
import styled from 'styled-components';

const Logo = (props) => {
  return (
    <LogoWrapper {...props}>
      <LogoShape>
        <img src="/asset/logo/logoShape.svg" alt="logo" />
      </LogoShape>
      <LogoText>
        <img src="/asset/logo/logoText.svg" alt="logo" />
      </LogoText>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoShape = styled.div`
  margin-bottom: 6px;
`;

const LogoText = styled.div``;

export default Logo;
