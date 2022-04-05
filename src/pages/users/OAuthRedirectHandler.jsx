import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { kakaoLoginAsync, selectedUserStatus } from '../../modules/users';
import { Wrapper, Grid, Text, Button, Loader } from 'components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OAuthRedirectHandler = (props) => {
  const { provider } = props;
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const loginStatus = useSelector(selectedUserStatus);

  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    dispatch(kakaoLoginAsync(code));
  }, []);

  if (loginStatus === 'failed') {
    <Wrapper full backgroundColor={themeContext.colors.white}>
      <Grid height="100%" center>
        <Grid margin="0px 0px 16px 0px">
          <Text color={themeContext.colors.blue}>로그인에 실패하였습니다</Text>
          <Text color={themeContext.colors.blue}>
            다른 로그인 방법은 어떠신가요?
          </Text>
        </Grid>
        <Button
          secondary
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인으로 돌아가기
        </Button>
      </Grid>
    </Wrapper>;
  } else {
    return (
      <Wrapper full backgroundColor={themeContext.colors.white}>
        <Grid height="100%" center>
          <Loader type="dot" backgroundColor={themeContext.colors.blue} />
        </Grid>
      </Wrapper>
    );
  }
};

OAuthRedirectHandler.propTypes = {
  provider: PropTypes.string,
};

export default OAuthRedirectHandler;
