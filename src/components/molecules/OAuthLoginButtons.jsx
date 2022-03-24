import React from 'react';

import styled from 'styled-components';
import { Button } from 'components/atoms';

const KAKAO_LOGIN_URL = process.env.REACT_APP_KAKAO_LOGIN_URL;

const handleOAuthLoginClick = (url) => () => {
  window.location.replace(url);
};

const OAuthLoginButtons = ({ ...props }) => {
  return (
    <>
      <Button
        onClick={handleOAuthLoginClick(KAKAO_LOGIN_URL)}
        fluid
        primary
        size={'large'}
        color="#392020"
      >
        <InnerWrapper>
          <InnerIcon src="/asset/icons/Kakao.svg" />
          <InnerText>카카오 계정으로 로그인</InnerText>
        </InnerWrapper>
      </Button>
    </>
  );
};

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const InnerIcon = styled.img`
  margin-right: 21px;
`;
const InnerText = styled.div`
  display: flex;
  align-items: center;
  &:before {
    content: '';
    width: 1px;
    height: 12px;
    background-color: #392020;
    margin-right: 21px;
  }
`;

export default OAuthLoginButtons;
