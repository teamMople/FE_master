import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

import {
  googleLoginAsync,
  naverLoginAsync,
  kakaoLoginAsync,
} from '../../modules/users';
import { Wrapper, Loader } from 'components';
import { useDispatch } from 'react-redux';

const OAuthRedirectHandler = (props) => {
  const { provider } = props;
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  let params = new URL(window.location).searchParams;
  let code = params.get('code');

  useEffect(() => {
    switch (provider) {
      case 'google':
        dispatch(googleLoginAsync(code));
        break;
      case 'naver':
        dispatch(naverLoginAsync(code));
        break;
      case 'kakao':
        dispatch(kakaoLoginAsync(code));
        break;
      default:
        return;
    }
  }, []);

  return (
    <Wrapper>
      <Loader type="dot" backgroundColor={themeContext.colors.blue} />
    </Wrapper>
  );
};

OAuthRedirectHandler.propTypes = {
  provider: PropTypes.string,
};

export default OAuthRedirectHandler;
