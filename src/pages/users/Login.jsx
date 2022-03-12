import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

import { kakaoLoginAsync, loginAsync } from '../../modules/users';

import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, Input, Button } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';

function Login(props, { history }) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    console.log(window.location);
  }, []);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = (e) => {
    dispatch(loginAsync(userInfo));
  };

  // 호준님 url : 'https://kauth.kakao.com/oauth/authorize?client_id=91ee90dad2384a8f06ab7106b2f92daf&redirect_uri=http://localhost:3000/api/kakao/login&response_type=code'
  const kakaoAuthUrl =
    'https://kauth.kakao.com/oauth/authorize?client_id=61d258f52ee7b081b616d4119c86ba99&redirect_uri=http://localhost:3000/oauth/kakao/callback&response_type=code';

  const query = queryString.parse(window.location.search);

  const handleKakaoLoginClick = (e) => {
    window.location.href = kakaoAuthUrl;
  };

  const userInfo = { email, password };

  useEffect(() => {
    console.log(query.code);
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
        _onClick={handleLoginClick}
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
