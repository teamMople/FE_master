import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import {
  googleLoginAsync,
  naverLoginAsync,
  kakaoLoginAsync,
} from '../../modules/users';
import { Wrapper, Grid, Loader } from 'components';
import { useDispatch } from 'react-redux';

const OAuthRedirectHandler = (props) => {
  const { provider } = props;
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  let params = new URL(window.location).searchParams;
  let code = params.get('code');
  console.log(code);

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
    <Wrapper full backgroundColor={themeContext.colors.white}>
      <Grid height="100%" center>
        <Loader type="dot" backgroundColor={themeContext.colors.blue} />
      </Grid>
    </Wrapper>
  );
};

OAuthRedirectHandler.propTypes = {
  provider: PropTypes.string,
};

export default OAuthRedirectHandler;
