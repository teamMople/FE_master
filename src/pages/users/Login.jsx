import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { loginAsync } from '../../modules/users';

import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, Input, Button } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';

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

  const handleKakaoLoginClick = (e) => {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?client_id=91ee90dad2384a8f06ab7106b2f92daf&redirect_uri=http://18.117.124.131/api/kakao/login&response_type=code';
  };

  const userInfo = { email, password };

  useEffect(() => {
    console.log(email, password);
  }, []);

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
        _onClick={() => {
          dispatch(loginAsync(userInfo));
        }}
        width="100%"
        backgroundColor={themeContext.colors.tertiary}
      >
        LOGIN
      </Button>
      <Text size="10px">비밀번호 찾기</Text>
      <Button width="100%" backgroundColor={themeContext.colors.primary}>
        구글 로그인
      </Button>
      <Button width="100%" backgroundColor={themeContext.colors.secondary}>
        네이버 로그인
      </Button>
      <Button
        _onClick={handleKakaoLoginClick}
        width="100%"
        backgroundColor={themeContext.colors.tertiary}
      >
        카카오 로그인
      </Button>
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
