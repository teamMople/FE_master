import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { loginAsync } from '../../modules/users';

import { ThemeContext } from 'styled-components';
import { Wrapper, Text, Input, Button, Grid } from '../../components/atoms';
import { Header } from '../../components/molecules';
import { useNavigate } from 'react-router-dom';
import OAuthLoginButtons from 'components/molecules/OAuthLoginButtons';
import { useAppDispatch } from 'modules/configStore';

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
    <Wrapper padding="53px 24px 0px 24px">
      <Header label="" />
      <Input
        placeholder="이름"
        marign-bottom="16px"
        value={email}
        _onChange={changeEmail}
      />
      <Input
        placeholder="이메일(아이디)"
        marign-bottom="16px"
        value={password}
        _onChange={changePassword}
        _type="password"
      />
      <Grid isFlex>
        <Text size="14px" color={themeContext.colors.blue}>
          비밀번호 찾기
        </Text>
        <Link to="/signup">
          <Text size="14px" color={themeContext.colors.blue}>
            회원가입
          </Text>
        </Link>
      </Grid>
      <Button
        _onClick={handleLoginClick}
        width="100%"
        height={38}
        color={themeContext.colors.white}
        backgroundColor={themeContext.colors.blue}
      >
        로그인
      </Button>
      <OAuthLoginButtons />
    </Wrapper>
  );
}

export default Login;
