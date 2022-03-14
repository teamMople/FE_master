import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext } from 'styled-components';
import { Button } from 'components/atoms';
import { kakaoLoginAsync } from 'modules/users';
import { useDispatch } from 'react-redux';

const KAKAO_LOGIN_URL = process.env.REACT_APP_KAKAO_LOGIN_URL;

const handleOAuthLoginClick = (url) => () => {
  window.location.replace(url);
  // dispatch(kakaoLoginAsync);
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
      <Outlet />
    </>
  );
};

export default OAuthLoginButtons;
