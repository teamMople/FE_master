import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAsync } from '../../modules/users';
import axios from 'axios';
import { setCookie } from '../../shared/utils/Cookie';

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
import { useDispatch } from 'react-redux';

function Login(props) {
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
    if (email === '' || password === '') {
      window.alert('이메일, 비밀번호 모두 입력해주세요.');
    } else {
      axios
        .post(
          'http://ebhojun-env.eba-pra2gntr.ap-northeast-2.elasticbeanstalk.com/api/login',
          JSON.stringify({ email, password }),
          { headers: { 'Content-Type': 'application/json' } },
        )
        .then((response) => {
          if (response.status === 200) {
            setCookie('token', response.headers.authorization, 1);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('nickname', response.data.nickname);
            navigate('/home');
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const userInfo = { email, password };

  React.useEffect(() => {}, []);

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="70px 24px 0px 24px"
    >
      <Header label="" leftArrow={true} rightArrow={false} />
      <Grid padding="44px 0px 0px 0px">
        <Grid margin="0px 0px 8px 0px">
          <Input
            backgroundColor={themeContext.colors.white}
            color={themeContext.colors.black}
            width="100%"
            height="52px"
            padding="15px 23px 15px 23px"
            marign-bottom="8px"
            type="text"
            placeholder="이름"
            value={email}
            onChange={changeEmail}
          />
        </Grid>
        <Grid>
          <Input
            backgroundColor={themeContext.colors.white}
            color={themeContext.colors.black}
            width="100%"
            height="52px"
            padding="15px 23px 15px 23px"
            marign-bottom="5px"
            type="password"
            placeholder="이메일(아이디)"
            value={password}
            onChange={changePassword}
          />
        </Grid>

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
            fluid
            secondary
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
