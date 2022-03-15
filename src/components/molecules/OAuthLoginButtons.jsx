import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Button } from 'components/atoms';

const KAKAO_LOGIN_URL = process.env.REACT_APP_KAKAO_LOGIN_URL;

const handleOAuthLoginClick = (url) => () => {
  window.location.replace(url);
};

const OAuthLoginButtons = ({ ...props }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <Button width="100%" backgroundColor={themeContext.colors.primary}>
        구글 로그인
      </Button>
      <Button width="100%" backgroundColor={themeContext.colors.secondary}>
        네이버 로그인
      </Button>
      <Button
        _onClick={handleOAuthLoginClick(KAKAO_LOGIN_URL)}
        width="100%"
        backgroundColor={themeContext.colors.tertiary}
      >
        카카오 로그인
      </Button>
    </>
  );
};

export default OAuthLoginButtons;
