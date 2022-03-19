import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Grid, Button } from 'components/atoms';

const KAKAO_LOGIN_URL = process.env.REACT_APP_KAKAO_LOGIN_URL;

const handleOAuthLoginClick = (url) => () => {
  window.location.replace(url);
};

const OAuthLoginButtons = ({ ...props }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <Button
        onClick={handleOAuthLoginClick(KAKAO_LOGIN_URL)}
        width="100%"
        height={38}
        color="#392020"
        backgroundColor={themeContext.colors.primaryYellow}
      >
        <div style={{ marginRight: '10px' }}>
          <img src="/asset/icons/Kakao.svg" />
        </div>
        <div style={{ marginRight: '10px' }}>|</div>
        <div>카카오 계정으로 로그인</div>
      </Button>
    </>
  );
};

export default OAuthLoginButtons;
