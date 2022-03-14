import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import queryString from 'query-string';

import { kakaoLoginAsync, loginAsync } from '../../modules/users';

import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, Input, Button } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';
import OAuthLoginButtons from 'components/molecules/OAuthLoginButtons';

function Login(props, { history }) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
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

  const query = queryString.parse(window.location.search);

  React.useEffect(() => {}, []);

  return (
    <Wrapper padding="53px 24px 0px 24px">
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
      <Button
        _onClick={handleLoginClick}
        width="100%"
        backgroundColor={themeContext.colors.tertiary}
      >
        LOGIN
      </Button>
      <Text size="10px">비밀번호 찾기</Text>
      <OAuthLoginButtons />
      <p>회원이 아니신가요?</p>
      <Button
        _onClick={() => {
          navigate('/signup');
        }}
        width="50%"
        backgroundColor={themeContext.colors.primary}
      >
        회원가입
      </Button>
    </Wrapper>
  );
}

export default Login;
