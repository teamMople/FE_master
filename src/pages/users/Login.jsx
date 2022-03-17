import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'modules/configStore';
import { loginAsync } from '../../modules/users';

import { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Text,
  Input,
  Button,
  Grid,
  Header,
  OAuthLoginButtons,
} from 'components';

function Login(props) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = (e) => {
    dispatch(loginAsync(userInfo));
  };

  const userInfo = { email, password };

  React.useEffect(() => {}, []);

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="70px 24px 0px 24px"
    >
      <Header label="로그인" leftArrow={true} rightArrow={false} />
      <Grid padding="44px 0px 0px 0px">
        <Input
          backgroundColor={themeContext.colors.white}
          color={themeContext.colors.black}
          width="100%"
          marign-bottom="8px"
          type="text"
          placeholder="이름"
          value={email}
          onChange={changeEmail}
        />
        <Input
          backgroundColor={themeContext.colors.white}
          color={themeContext.colors.black}
          width="100%"
          marign-bottom="5px"
          type="password"
          placeholder="이메일(아이디)"
          value={password}
          onChange={changePassword}
        />
        <div
          style={{
            display: 'flex',
            height: '48px',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '35px',
          }}
        >
          <Grid isFlex width="50%">
            <Link to="/findpassword">
              <Text size="14px" color={themeContext.colors.blue}>
                비밀번호 찾기
              </Text>
            </Link>
            <Link to="/signup">
              <Text size="14px" color={themeContext.colors.blue}>
                회원가입
              </Text>
            </Link>
          </Grid>
        </div>
        <Grid padding="0px 15px 0px 15px">
          <Button
            onClick={handleLoginClick}
            width="100%"
            height={38}
            color={themeContext.colors.white}
            backgroundColor={themeContext.colors.blue}
            margin="0px 0px 8px 0px"
          >
            로그인
          </Button>
          <OAuthLoginButtons />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Login;
