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

  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    dispatch(kakaoLoginAsync(code));
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
