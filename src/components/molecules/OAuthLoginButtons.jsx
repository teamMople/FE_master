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
      <Button
        _onClick={handleOAuthLoginClick(KAKAO_LOGIN_URL)}
        width="100%"
        height={38}
        color={themeContext.colors.black}
        backgroundColor={themeContext.colors.primaryYellow}
      >
        <img src="/asset/icons/Kakao.svg" /> | 카카오 로그인
      </Button>
    </>
  );
};

export default OAuthLoginButtons;
