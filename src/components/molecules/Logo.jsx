import React from 'react';
import styled from 'styled-components';

const Logo = (props) => {
  return (
    <LogoWrapper {...props}>
      <img src="/asset/logo/logo.svg" />
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div``;

export default Logo;
